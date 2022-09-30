import React, { useState } from 'react';
import { format } from 'date-fns';
import { ActionIcon, Button } from '@mantine/core';
import { IconArrowBack, IconCirclePlus } from '@tabler/icons';
import { useGlobalContext } from '../GlobalContext';
import CreateForm from './CreateForm';
import { IconCheck } from '@tabler/icons';
import { Notification } from '@mantine/core';

import Table from './Table.js';

const Supervisor = () => {
	const { resits, grades, setGrades, step, setStep } = useGlobalContext();
	const [selectedResit, setSelectedResit] = useState();

	const resitsHeaders = [
		{
			Header: 'Rattrapage',
			accessor: 'name', // accessor is the "key" in the data
		},
		{
			Header: 'Sujet',
			accessor: 'exam',
			Cell: ({
				cell: {
					row: {
						original: { exam },
					},
				},
			}) => (
				<a className='' href={exam} target='_blank' rel='noreferrer'>
					Voir le Pdf
				</a>
			),
		},
		{
			Header: 'Date',
			Cell: ({
				cell: {
					row: {
						original: { resitDate },
					},
				},
			}) => format(resitDate, 'dd-MM-yyyy'),
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
		{
			Header: 'Professeur',
			accessor: 'teacher.name',
		},
		{
			Header: 'Surveillant',
			accessor: 'overseer.name',
		},
		{
			Header: "Nombre d'élèves",
			Cell: (props) => (
				<Button className='shadow text-teal-500 border-teal-500 hover:bg-teal-500 hover:text-white hover:scale-[1.05] transition duration-300' variant='outline' onClick={() => onSingleEdit(props.cell.row.original)}>
					Voir les {props.cell.row.original.id}
				</Button>
			),
		},
	];
	const gradesHeaders = [
		{
			Header: 'Photo',
			Cell: ({
				cell: {
					row: {
						original: { picture },
					},
				},
			}) => (
				<div className='rounded-full'>
					<img src={picture} alt={'pic'} />
				</div>
			),
		},
		{
			Header: 'Nom',
			accessor: 'lastName',
		},
		{
			Header: 'Prénom',
			accessor: 'name',
		},
		{
			Header: 'Note',
			accessor: 'grade',
		},
		{
			Header: 'Classe',
			accessor: 'classroom',
		},
	];

	const onSingleEdit = (row) => {
		fetch(`http://localhost:9000/gradesbyresit?id=${row.id}`)
			.then((res) => res.json())
			.then((data) =>
				setGrades(
					data.map((grade) => {
						return { name: grade.student.name, lastName: grade.student.lastName, grade: grade.grade, classroom: grade.student.classroom.name, picture: grade.student.picture };
					})
				)
			)
			.catch((err) => console.log('catched fetch error :', err));

		setStep('studentList');
		setSelectedResit(row);
	};

	const onSingleDelete = (resit) => {
		fetch(`http://localhost:9000/delresit/${resit.id}`, { method: 'DELETE' }).then(() => console.log('Delete successful'));
	};

	return (
		<div className='p-4'>
			{resits && step === 'resitsList' && (
				<>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>
					<ActionIcon
						title='Créer un rattrapage'
						onClick={() => {
							setStep('createResit');
						}}
						className='absolute top-28 right-10 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'>
						<IconCirclePlus size={32} />
					</ActionIcon>
					<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />
				</>
			)}

			{grades && step === 'studentList' && (
				<>
					<h2 className='text-center text-2xl font-bold mt-8'>Liste des Étudiants</h2>
					<p className='text-center'>
						Pour le module <span className='font-medium italic uppercase'>{selectedResit.name}</span> du {format(selectedResit.resitDate, 'dd-MM-yyyy')}
					</p>
					<IconArrowBack
						className='absolute top-28 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'
						size={38}
						onClick={() => {
							setStep('resitsList');
						}}
					/>
					<Table dataTable={grades} headers={gradesHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />
				</>
			)}

			{step === 'createResit' && <CreateForm />}
			<Notification className='absolute top-0 w-content left-5 my-8' icon={<IconCheck size={18} />} color='teal' title='Nouvelle Suppression'>
				Le rattrapage à bien été supprimé
			</Notification>
		</div>
	);
};

export default Supervisor;
