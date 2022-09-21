import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { IconArrowBack } from '@tabler/icons';

import Table from './Table.js';

const Supervisor = () => {
	const [grades, setGrades] = useState();
	const [resits, setResits] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [step, setStep] = useState('resitsList');

	const myref = useRef('input');

	useEffect(() => {
		fetch('http://localhost:9000/resits')
			.then((res) => res.json())
			.then((data) => {
				setResits(
					data.map((resit) => {
						return { id: resit.id, name: resit.name, duration: resit.duration, exam: resit.exam, date: format(resit.resitDate, 'dd-MM-yyyy'), status: resit.status, teacherName: resit.teacher.name, overseerName: resit.overseer.name };
					})
				);
			})
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/grades')
			.then((res) => res.json())
			.then((data) => {
				setGrades(
					data.map((grade) => {
						return { name: grade.student.name, lastName: grade.student.lastName, grade: grade.grade, classroom: grade.student.classroom.name, picture: grade.student.picture };
					})
				);
			})
			.catch((err) => console.log('catched fetch error :', err));
	}, []);

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
			accessor: 'date',
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
		{
			Header: 'Professeur',
			accessor: 'teacherName',
		},
		{
			Header: "Nombre d'élèves",
			accessor: 'overseerName',
		},
	];
	const gradesHeaders = [
		{
			Header: 'Photo',
			accessor: 'picture',

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
	const onSingleDelete = (item) => {
		fetch('http://localhost:9000/postresits' + (item.id ? '/' + item.id : ''), {
			method: item.id ? 'PUT' : 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: 9,
				resitDate: null,
				name: 'montest',
				exam: 'urltest',
				status: 'veryf',
				duration: null,
			}),
		});
	};
	const test = () => {
		fetch('http://localhost:9000/addresit', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				resitDate: '2022-09-18',
				name: 'Python',
				exam: 'urltest',
				status: 'veryf',
				duration: '02:00:00',
				teacher_id: 3,
				overseer_id: 3,
			}),
		});
	};

	return (
		<div className='p-4'>
			{resits && step === 'resitsList' && (
				<>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>
					<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />
				</>
			)}

			{grades && step === 'studentList' && (
				<>
					<h2 className='text-center text-2xl font-bold mt-8'>Liste des Étudiants</h2>
					<p className='text-center'>
						Pour le module <span className='font-medium italic uppercase'>{selectedResit.name}</span> du {selectedResit.date}
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
		</div>
	);
};

export default Supervisor;
