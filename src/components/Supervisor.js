import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { format } from 'date-fns';
import Table from './Table.js';

const Supervisor = () => {
	const [grades, setGrades] = useState();
	const [resits, setResits] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [step, setStep] = useState('resitsList');

	const resitsHeaders = [
		{
			Header: 'Rattrapage',
			accessor: 'name', // accessor is the "key" in the data
		},
		{
			Header: 'Sujet',
			accessor: 'exam',
		},
		{
			Header: 'Date',
			accessor: 'resitDate',
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
			Header: 'Nom',
			accessor: 'student.lastName', // accessor is the "key" in the data
		},
		{
			Header: 'Prenom',
			accessor: 'student.name',
		},
		{
			Header: 'Note',
			accessor: 'grade',
		},
	];

	useEffect(() => {
		fetch('http://localhost:9000/resits')
			.then((res) => res.json())
			.then((data) => {
				setResits(
					data.map((resit) => {
						return { id: resit.id, name: resit.name, duration: resit.duration, exam: resit.exam, resitDate: format(resit.resitDate, 'dd-MM-yyyy'), status: resit.status, teacherName: resit.teacher.name, overseerName: resit.overseer.name };
					})
				);
			})
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/grades')
			.then((res) => res.json())
			.then((data) => {
				setGrades(data);
			})
			.catch((err) => console.log('catched fetch error :', err));
	}, []);

	const onSingleEdit = (row) => {
		fetch(`http://localhost:9000/gradesbyresit?id=${row.id}`)
			.then((res) => res.json())
			.then((data) => setGrades(data))
			.catch((err) => console.log('catched fetch error :', err));

		setStep('studentList');
		setSelectedResit(row);
	};
	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};

	return (
		<div className='p-4'>
			{resits && step === 'resitsList' && (
				<>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>
					<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />
				</>
			)}

			{console.log(selectedResit)}

			{grades && step === 'studentList' && (
				<>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des Étudiants</h2>
					<h3 className='text-center text-2xl font-bold m-8'>
						Module {selectedResit.name} du {selectedResit.date}
					</h3>
					<p>revenir</p>
					<Table dataTable={grades} headers={gradesHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />
				</>
			)}
		</div>
	);
};

export default Supervisor;
