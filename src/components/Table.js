import React from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';

const Table = ({ dataTable, onSingleEdit, onSingleDelete, headers }) => {
	const data = React.useMemo(() => dataTable || [], [dataTable]);

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
							<IconEdit color='orange' />
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

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({ columns, data }, useGlobalFilter);
	const { globalFilter } = state;

	return (
		<div className='flex flex-col items-center justify-center'>
			<TextInput className='w-1/2' styles={{ input: { border: 'none', backgroundColor: '#F5F5F5', borderBottom: '2px solid #3CC3BE', borderRadius: '300px', padding: '20px' }, rightSection: { color: '#3CC3BE', padding: '8px' } }} value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} rightSection={<IconSearch />} />

			<table className='bg-white rounded-md p-3 shadow mt-10' {...getTableProps()}>
				<thead className='bg-teal-500 text-white rounded-t-md'>
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
				<tbody {...getTableBodyProps()} className='rounded-b-md'>
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
		</div>
	);
};

export default Table;
