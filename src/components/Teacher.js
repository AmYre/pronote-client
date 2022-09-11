import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import { Button } from '@mantine/core';
import { IconPower } from '@tabler/icons';
import { auth } from '../firebase';

const Header = () => {
	const [resits, setResits] = useState();

	let navigate = useNavigate();

	const data = React.useMemo(() => resits || [], [resits]);

	useEffect(() => {
		fetch('http://localhost:9000/resits')
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));
	}, []);

	const columns = React.useMemo(
		() => [
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
		],
		[]
	);

	console.log(resits);

	const tableInstance = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	const filterByTeacherId = (id) => {
		fetch(`http://localhost:9000/resitsbyteacher?id=${id}`)
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));
	};

	const reset = (id) => {
		fetch(`http://localhost:9000/resits`)
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));
	};

	return (
		<div className='p-4'>
			<h2 className='text-center text-2xl font-bold m-8'>Bienvenue Mathieu</h2>

			<Button onClick={reset} className='inline-flex font-bold mt-8 mb-8 bg-blue-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-blue-500 transition duration-300'>
				Tous
			</Button>

			{resits &&
				resits.map((resit) => (
					<Button onClick={() => filterByTeacherId(resit.teacher.id)} className='inline-flex font-bold mt-8 mb-8 bg-blue-300 mr-4 px-6 py-2 text-white rounded shadow hover:bg-blue-500 transition duration-300'>
						{resit.teacher.email}
					</Button>
				))}
			<>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{resits ? (
							rows.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
										})}
									</tr>
								);
							})
						) : (
							<tr>
								<td>...</td>
							</tr>
						)}
					</tbody>
				</table>
			</>

			{console.log(resits)}

			<IconPower
				color='green'
				className='absolute right-4 top-4'
				onClick={() => {
					auth.signOut();
					navigate(`/`);
				}}></IconPower>
		</div>
	);
};

export default Header;
