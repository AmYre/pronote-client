import React, { useState } from 'react';
import Table from './Table';
import format from 'date-fns/format';
import { useGlobalContext } from '../GlobalContext';
import { IconArrowBack, IconCirclePlus } from '@tabler/icons';
import { ActionIcon } from '@mantine/core';

const Teacher = () => {
	const { resits, setResits, grades, setGrades, step, setStep, teachers } = useGlobalContext();
	const [selectedResit, setSelectedResit] = useState();

	const resitsHeaders = [
		{
			Header: 'Id',
			accessor: 'id', // accessor is the "key" in the data
		},
		{
			Header: 'Sujet',
			accessor: 'name',
		},
		{
			Header: 'Exam',
			accessor: 'exam',
		},
		{
			Header: 'Date',
			Cell: ({
				cell: {
					row: {
						original: { resitDate },
					},
				},
			}) => {
				return format(resitDate, 'dd-MM-yyyy');
			},
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
			Header: 'Status',
			accessor: 'status',
		},
		{
			Header: 'Id du professeur',
			accessor: 'teacher.id',
		},
	];

	const gradesHeaders = [
		{
			Header: "Prenom de l'étudiant",
			accessor: 'student.name',
		},
		{
			Header: "Nom de l'étudiant",
			accessor: 'student.lastName',
		},
		{
			Header: "Note de l'étudiant",
			accessor: 'grade',
		},
		{
			Header: 'Sujet',
			accessor: 'resit.name',
		},
		{
			Header: 'Surveillant',
			accessor: 'resit.overseer.name',
		},
	];

	const onSelectedResit = (row) => {
		fetch(`http://localhost:9000/gradesbyresit?id=${row.id}`)
			.then((responseOnHttp) => responseOnHttp.json())
			.then((data) => setGrades(data))
			.catch((error) => console.log('catched fetch error :', error));

		setStep('studentList');
		setSelectedResit(row);
	};
	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};

	//Creation d'une fonction pour trier les prof par leurs ID
	const filterByTeacherId = (id) => {
		//Recuperation des info de l'URL envoyer par l'API REST (notre back-end)
		fetch(`http://localhost:9000/teacherById?id=${id}`)
			//(.then) en attendant les données envoyer par le back puis les transformé en .json
			.then((responseOnHttp) => responseOnHttp.json())
			//Les info de notre route URL son récupérer dans  "data" puis son stovké dan setResits pour nous fournir das données utilisable
			.then((data) => setResits(data))
			//Attraper une erreur si elle se produit
			.catch((error) => console.log('catched fetch error :', error));
		//console.log(id)
	};

	return (
		<div className='p-4'>
			{resits && step === 'resitsList' && (
				<div className='items-center'>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>

					<ActionIcon
						title='Créer un rattrapage'
						onClick={() => {
							setStep('createResit');
						}}
						className='absolute top-28 right-10 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'>
						<IconCirclePlus size={32} />
					</ActionIcon>

					{/* Création d'une boucle avec son bouton pour la selection
					si il y a des teachers allors
					nous bouclons sur les teachers pour inclure la fonction créer précédemment filterByTeacherId() */}
					{teachers &&
						teachers.map((teacher) => (
							<button key={teacher.id} onClick={() => filterByTeacherId(teacher.id)} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
								{teacher.name}
							</button>
						))}

					<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSelectedResit} onSingleDelete={onSingleDelete} />
				</div>
			)}

			{}

			{grades && step === 'studentList' && (
				<div>
					<h2 className='text-center text-2xl font-bold m-8'>Liste des élèves</h2>

					<IconArrowBack
						className='absolute top-28 cursor-pointer hover:text-teal-500 transition duration-200 hover:shadow-teal-500 hover:scale-[.9]'
						size={38}
						onClick={() => {
							setStep('resitsList');
						}}
					/>

					<Table dataTable={grades} headers={gradesHeaders} onSingleEdit={onSelectedResit} onSingleDelete={onSingleDelete} />
				</div>
			)}
		</div>
	);
};

export default Teacher;
