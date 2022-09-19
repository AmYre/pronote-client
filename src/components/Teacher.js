import React, { useEffect, useState } from 'react';
import Table from './Table';
import format from 'date-fns/format';
import { Button } from '@mantine/core';


const Teacher = () => {

	const [grades, setGrades] = useState();
	const [teachers, setTeachers] = useState();
	const [resits, setResits] = useState();

	
	

	useEffect(() => {
		fetch("http://localhost:9000/resits")
		.then(response => response.json())
		.then(response => {
			//Creation d'un nouveau objet qui s'appele "element" pour nouveau element
			setResits(response.map((element) => {return {
				//(1=resit=le mouveau objet) (2=l'objet resit) (3=id de l'encient objet) 
				id : element.id, 
				name : element.name,
				exam : element.exam,
				date : format(element.resitDate, 'dd-MM-yyyy'),
				teacherName : element.teacher.lastName,
				oversserName : element.overseer.name,
				status : element.status,
				teacherId : element.teacher.id,
			}}));
			//console.log(format(response[0].resitDate,'dd-MM-yyyy'));
		}
			)
		.catch(error => console.log(error))
		
		
	}, []);

	useEffect(() => {
		fetch("http://localhost:9000/grades")
		.then(responseOnHttp => responseOnHttp.json())
		.then(data => setGrades(data))
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
		},
		{
			Header: 'Professeur',
			accessor: 'teacherName',
		},
		{
			Header: "Surveillant",
			accessor: 'oversserName',
		},
		{
			Header: "Status",
			accessor: 'status',
		},
		{
			Header: "Id du professeur",
			accessor: 'teacherId',
		},
	];

	const onSingleEdit = (row) => {
		console.log("dfdg")
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
		console.log(id)
	}

	return (
		<div className='content-center'>

			<div className='p-4'>

				<h2 className='text-center text-2xl font-bold m-8'>Bienvenue</h2>

				{
					//Création d'une boucle avec son bouton pour la selection
					//si il y a des teachers allors
					//nous bouclons sur les teachers pour inclure la fonction créer précédemment filterByTeacherId()
					teachers && teachers.map(teacher => (
						<button key={teacher.id} onClick={() => filterByTeacherId(teacher.id)} className='inline-flex font-bold mt-8 mb-8 bg-teal-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-teal-500 transition duration-300'>
							{teacher.name}
						</button>))
				}
				


				{ 
					resits && <Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete}/>
				}
	
			</div>
		</div>
	);
};

export default Teacher;
