import React from 'react';
import { useTable } from 'react-table';
import { ActionIcon } from '@mantine/core';
import { IconArrowsDiagonal, IconTrash } from '@tabler/icons';

const Table = ({ dataTable, onSingleEdit, onSingleDelete, headers }) => {
	const data = React.useMemo(() => dataTable || [], [dataTable]);

	console.log(dataTable);

	const columns = React.useMemo(
		() => [
			...headers,
			{
				id: 'see',
				Header: '',
				Cell: ({ row }) => (
					<div className='flex flex-row items-center space-x-1'>
						<ActionIcon
							onClick={() => {
								onSingleEdit(row.original);
							}}>
							<IconArrowsDiagonal color='orange' />
						</ActionIcon>
						<ActionIcon
							onClick={async () => {
								await onSingleDelete(row.original);
							}}>
							<IconTrash color='red' />
						</ActionIcon>
					</div>
				),
			},
		],
		[headers, onSingleEdit, onSingleDelete]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<table className='bg-white rounded p-3 shadow' {...getTableProps()}>
			<thead className='bg-teal-500 text-white'>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th className='p-4' {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, index) => {
					prepareRow(row);
					return (
						<tr className=' hover:bg-teal-100 hover:scale-[1.02] transition duration-300' {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td className='border-b-gray-200 border-b p-4 text-center' {...cell.getCellProps()}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
