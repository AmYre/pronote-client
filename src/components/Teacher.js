import React, { useEffect, useState } from 'react';
import Table from './Table';
import format from 'date-fns/format';
import { Button } from '@mantine/core';


const Teacher = () => {

	const [grades, setGrades] = useState();
	const [teachers, setTeachers] = useState();
	const [resits, setResits] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [step, setStep] = useState('allResits');

	
	

	useEffect(() => {
		fetch("http://localhost:9000/resits")
		.then(responseOnHttp => responseOnHttp.json())
		.then(data => {
			//Creation d'un nouveau objet qui s'appele "element" pour nouveau element
			setResits(data);
			//console.log(format(response[0].resitDate,'dd-MM-yyyy'));
		}
			)
		.catch(error => console.log(error))
		
		
	}, []);

	useEffect(() => {
		fetch("http://localhost:9000/grades")
		.then(responseOnHttp => responseOnHttp.json())
		.then((data) => {
			setGrades(data.map((gradeElement) => {return {
				studentId : gradeElement.student.id,
				studentName : gradeElement.student.name,
				studentLastName : gradeElement.student.lastName,
				studentGrade : gradeElement.grade,
				resit : gradeElement.resit.id,
			}}));})
		.catch(error => console.log("catched fetch error :", error))

		fetch("http://localhost:9000/teachers")
		.then(responseOnHttp => responseOnHttp.json())
		.then(data => setTeachers(data))
		.catch(error => console.log("catched fetch error :", error))
	}, [])



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
			accessor: 'date',
			Cell : ({cell : {row : { original : {resitDate}}}}) => {
				return format(resitDate,'dd-MM-yyyy')
			}
			
			
		},
		// {
		// 	Header: 'Professeur',
		// 	accessor: 'teacherName',
		// },
		// {
		// 	Header: "Surveillant",
		// 	accessor: 'oversserName',
		// },
		// {
		// 	Header: "Status",
		// 	accessor: 'status',
		// },
		// {
		// 	Header: "Id du professeur",
		// 	accessor: 'teacherId',
		// },
	];

	const gradesHeaders = [
		{
			Header: 'ID de l\'étudiant',
			accessor: 'studentId', // accessor is the "key" in the data
		},
		{
			Header: 'Prenom de l\'étudiant',
			accessor: 'studentName',
		},
		{
			Header: 'Nom de l\'étudiant',
			accessor: 'studentLastName',
		},
		{
			Header: 'Note de l\'étudiant',
			accessor: 'studentGrade',
		},
		{
			Header: 'Id Rattrapage',
			accessor: 'resit',
		},
		// {
		// 	Header: "Surveillant",
		// 	accessor: 'oversserName',
		// },
		// {
		// 	Header: "Status",
		// 	accessor: 'status',
		// },
		// {
		// 	Header: "Id du professeur",
		// 	accessor: 'teacherId',
		// },
	];


	const onSelectedResit = (row) => {
		fetch(`http://localhost:9000/gradebyresit?id=${row.id}`)
		.then(responseOnHttp => responseOnHttp.json())
		.then((data) => setGrades(data))
		.catch(error => console.log("catched fetch error :", error))

		setStep('resit')
		setSelectedResit(row);

	};
	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};
	
	//Creation d'une fonction pour trier les prof par leurs ID
	const filterByTeacherId = (id) => {
		//Recuperation des info de l'URL envoyer par l'API REST (notre back-end)
		fetch(`http://localhost:9000/teacherById?id=${id}`)
		//(.then) en attendant les données envoyè par le back puis les transformé en .json
		.then(responseOnHttp => responseOnHttp.json())
		//Les info de notre route URL son récupérer dans  "data" puis son stovké dan setResits pour nous fournir das données utilisable 
		.then(data => setResits(data))
		//Attraper une erreur si elle se produit
		.catch(error => console.log("catched fetch error :", error))
		//console.log(id)
	}

	return (
		<div className='content-center'>

			<div className='p-4'>

				<h2 className='text-center text-2xl font-bold m-8'>Bienvenue</h2>

				{resits && step === 'allResits' &&(

					<div>
						<h2 className='text-center text-2xl font-bold m-8'>Liste des Rattrapages</h2>
						{teachers && teachers.map(teacher => (
						<button key={teacher.id} onClick={() => filterByTeacherId(teacher.id)} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
							{teacher.name}
						</button>))}

						<Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSelectedResit} onSingleDelete={onSingleDelete}/>
				
					</div>

					
				)}

				{/*console.log(selectedResit)*/}
				

				{
					//Création d'une boucle avec son bouton pour la selection
					//si il y a des teachers allors
					//nous bouclons sur les teachers pour inclure la fonction créer précédemment filterByTeacherId()
					
				}
				


				
				{ 
					grades && <Table dataTable={grades} headers={gradesHeaders} onSingleEdit={onSelectedResit} onSingleDelete={onSingleDelete}/>
				}
	
			</div>
		</div>
	);
};

export default Teacher;
