import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import Table from './Table';



const Overseer = () => {

	const [resits, setResits] = useState();
	const [grades, setGrades] = useState();
	
	

	useEffect(() => {
		fetch('http://localhost:9000/resits/noef')
			.then((res) => res.json())
			.then((res) => {
				setResits(res);
			})
			.catch((err) => console.log('catched fetch error :', err));

	}, []);

	

	const gradeResit= (row) => {
		fetch(`http://localhost:9000/gradesbyresit?id=${row.id}`)
			.then((res) => res.json())
			.then((data) => setGrades(data))
			.catch((err) => console.log('catched fetch error :', err));
	
	};

	const onSingleEdit= (row) => {
		console.log("first")
	
	};

	

	const resitsHeaders = [
		{
			Header: 'Rattrapage',
			accessor: 'name',
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
		<>
			

		{
	resits && <Table dataTable={resits} headers={resitsHeaders} onSingleEdit={gradeResit} onSingleDelete={onSingleDelete} />
		}

		{
	grades && <Table dataTable={grades} headers={gradresitHeaders} onSingleEdit={onSingleEdit} onSingleDelete={onSingleDelete} />

}
			
		</>
	)
};

export default Overseer;
