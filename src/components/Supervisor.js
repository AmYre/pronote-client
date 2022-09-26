import React, { useEffect, useState } from 'react';
import { format, getTime } from 'date-fns';
import { ActionIcon, Button } from '@mantine/core';
import { IconArrowBack, IconCirclePlus } from '@tabler/icons';
import { useForm } from 'react-hook-form';

import Table from './Table.js';

const Supervisor = () => {
	const [resits, setResits] = useState();
	const [grades, setGrades] = useState();
	const [overseers, setOverseers] = useState();
	const [teachers, setTeachers] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [step, setStep] = useState('resitsList');

	useEffect(() => {
		fetch('http://localhost:9000/resits')
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/grades')
			.then((res) => res.json())
			.then((data) => setGrades(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/overseers')
			.then((res) => res.json())
			.then((data) => setOverseers(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/teachers')
			.then((res) => res.json())
			.then((data) => setTeachers(data))
			.catch((err) => console.log('catched fetch error :', err));
	}, []);

	const { register, handleSubmit } = useForm();

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
			Header: "Nombre d'élèves",
			Cell: ({
				cell: {
					row: {
						original: { id },
					},
				},
			}) => 8,
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
		console.log('delete', resit.id);
	};
	const addResit = (resit) => {
		fetch('http://localhost:9000/addresit' + (resit.id ? '/' + resit.id : ''), {
			method: resit.id ? 'PUT' : 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...resit, resitDate: getTime(new Date(resit.resitDate)) }),
		});
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

			{step === 'createResit' && (
				<>
					<h2 className='text-center text-2xl font-bold mt-8'>Ajouter un rattrapage</h2>
					<form onSubmit={handleSubmit(addResit)} className='bg-white p-10 m-4 rounded'>
						<div className='flex flex-col pb-4'>
							<label className='font-bold text-teal-500'>Nom du Rattrapage</label>
							<input className='p-2 focus:outline-none' placeholder='...' {...register('name')} required />
						</div>
						<div className='flex flex-col pb-4'>
							<label className='font-bold text-teal-500'>Lien vers le PDF de l'examen</label>
							<input className='p-2 focus:outline-none' placeholder='Pick one' {...register('exam')} required />
						</div>
						<div className='flex pb-4'>
							<div>
								<label className='font-bold text-teal-500'>Durée de l'épreuve</label>
								<input className='p-2 focus:outline-none' type='time' step='1' {...register('duration')} required />
							</div>
							<div>
								<label className='font-bold text-teal-500'>Date de l'épreuve</label>
								<input className='p-2 focus:outline-none' type='date' {...register('resitDate')} required />
							</div>
						</div>
						<div className='flex pb-4'>
							<div className='flex flex-col pb-4 pr-8'>
								<label className='font-bold text-teal-500'>Attribuer un enseignant</label>
								<select {...register('teacher_id')} required className='p-2 focus:outline-none'>
									<option selected disabled={true} value=''>
										Choisir...
									</option>
									{teachers.map((teacher) => (
										<option value={teacher.id}>{teacher.name}</option>
									))}
								</select>
							</div>
							<div className='flex flex-col pb-4'>
								<label className='font-bold text-teal-500'>Attribuer un surveillant</label>
								<select {...register('overseer_id')} required className='p-2 focus:outline-none'>
									<option selected disabled={true} value=''>
										Choisir...
									</option>
									{overseers.map((overseer) => (
										<option value={overseer.id}>{overseer.name}</option>
									))}
								</select>
							</div>
						</div>
						<input type='hidden' value='noef' {...register('status')} />
						<Button type='submit' color='teal' className='bg-teal-500'>
							Créer Rattrapage
						</Button>
					</form>
					<IconArrowBack
						className='absolute top-28 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'
						size={38}
						onClick={() => {
							setStep('resitsList');
						}}
					/>
				</>
			)}
		</div>
	);
};

export default Supervisor;
