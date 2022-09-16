import React, { useEffect, useState } from 'react';
import Table from './Table';
import format from 'date-fns/format';
import { Button } from '@mantine/core';


const Teacher = () => {

	const [data, setData] = useState();
	const [grades, setGrades] = useState();
	const [resits, setResits] = useState();

	
	

	useEffect(() => {
		fetch("http://localhost:9000/resits")
		.then(response => response.json())
		.then(response => {
			setData(response);
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



		//Creation d'un nouveau objet qui s'appele "element" pour nouveau element
		if(data) {
			setResits(data.map((element) => {return {
				//(1=resit=le mouveau objet) (2=l'objet resit) (3=id de l'encient objet) 
				id : element.id, 
				name : element.name,
				exam : element.exam,
				date : format(element.resitDate, 'dd-MM-yyyy'),
				teacherName : element.teacher.lastName,
				oversserName : element.overseer.name,
				status : element.status,
			}}))
			
		}

		

	}, [data])

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
	];

	const onSingleEdit = (row) => {
		console.log("dfdg")
	};
	const onSingleDelete = (row) => {
		console.log('delited !', row.id);
	};
	

	return (
		<div className='content-center'>

			<div className='p-4'>

				<h2 className='text-center text-2xl font-bold m-8'>Bienvenue</h2>

				{ 
					resits && <Table dataTable={resits} headers={resitsHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete}/>
				}
				
			</div>
		</div>
	);
};

export default Teacher;
