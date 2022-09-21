import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import Table from './Table';
import { IconArrowBack } from '@tabler/icons';

const Overseer = () => {

	const [resits, setResits] = useState();
	const [grades, setGrades] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [step, setStep] = useState('resitsList');
	
		useEffect(() => {
		fetch('http://localhost:9000/resits/noef')
			.then((res) => res.json())
			.then((res) => {
				setResits(res);
			})
			.catch((err) => console.log('catched fetch error :', err));

	}, []);

	const studentList= (row) => {
		fetch(`http://localhost:9000/gradesbyresit?id=${row.id}`)
			.then((res) => res.json())
			.then((data) => setGrades(data))
			.catch((err) => console.log('catched fetch error :', err));

			setStep('studentList');
			setSelectedResit(row);
	
	};



	const resitsHeaders = [
		{
			Header: 'Rattrapage',
			accessor: 'name',
		},		
		{
			Header: 'Date',
			Cell: ({ cell: { row: { original: { resitDate } } } }) => {
				return format(resitDate, 'dd-MM-yyyy')
			}

		},	
		{
			Header: 'Status',
			accessor: 'status',
		},
		{
			Header: "Surveillant",
			accessor: 'overseer.name',
		},
	]

	const gradresitHeaders = [
		{
			Header: 'student',
			accessor: 'student.name', 
		},
		{
			Header: 'Sujet',
			accessor: 'resit.exam',
		},
		
	]

	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};

	return (
		<div className='p-4'>
		{resits && step === 'resitsList' && (
			<>
				<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>
				<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={studentList} onSingleDelete={onSingleDelete} />
			</>
		)}

		 {resits && console.log(resits)}

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
				<Table dataTable={grades} headers={gradresitHeaders} onSingleEdit={() => console.log("first")} onSingleDelete={onSingleDelete} />
			</>
		)}
	</div>
);
};

export default Overseer;
