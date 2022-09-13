import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import Table from './Table.js';

const Supervisor = () => {
	const [resits, setResits] = useState();
	const [grades, setGrades] = useState();

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
			accessor: 'teacher.email',
		},
		{
			Header: "Nombre d'élèves",
			accessor: 'teacher.id',
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
				setResits(data);
			})
			.catch((err) => console.log('catched fetch error :', err));
	}, []);

	useEffect(() => {
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
	};
	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};

	const filterByStatus = (status) => {
		fetch(`http://localhost:9000/resits/${status}`)
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));
	};

	const reset = () => {
		fetch(`http://localhost:9000/resits`)
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));
	};

	return (
		<div className='p-4'>
			<h2 className='text-center text-2xl font-bold m-8'>Bienvenue Julien</h2>

			<div className=''>
				<Button onClick={() => filterByStatus('ef')} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
					Effectué
				</Button>
				<Button onClick={() => filterByStatus('efno')} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
					Effectué non noté
				</Button>
				<Button onClick={() => filterByStatus('noef')} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
					Non effectué
				</Button>
				<Button onClick={reset} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
					Tous
				</Button>
			</div>
			{resits && <Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />}

			{grades && <Table dataTable={grades} headers={gradesHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />}
		</div>
	);
};

export default Supervisor;
