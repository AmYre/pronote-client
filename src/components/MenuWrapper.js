import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { ActionIcon } from '@mantine/core';
import logo from '../img/logo.png';
import { IconSchool, IconChalkboard, IconClipboardList, IconCertificate, IconPower } from '@tabler/icons';

const MenuWrapper = ({ children }) => {
	let navigate = useNavigate();

	return (
		<div className='flex'>
			<nav className='min-h-screen w-1/5 bg-gray-800 text-white'>
				<div className='p-4 m-4 border-b border-gray-500 '>
					<p className=''>Nom Prénom</p>
					<p className='font-bold'>SUPERVISOR</p>
				</div>
				<div className='flex flex-col p-6 m-4 pb-10 gap-16'>
					<div className='flex gzp-1'>
						<IconCertificate /> Rattrapages
					</div>
					<div className='flex gap-1'>
						<IconChalkboard /> Professeurs
					</div>
					<div className='flex gap-1'>
						<IconClipboardList /> Surveillants
					</div>
					<div className='flex gap-1'>
						<IconSchool /> Étudiants
					</div>
				</div>
			</nav>
			<div className='w-4/5 bg-gray-200'>
				<div className='flex items-center justify-between h-[96px] bg-white shadow'>
					<div className=''>
						<img src={logo} alt='logo' className='w-24 pl-8 pt-4' />
					</div>
					<div className='w-full text-2xl text-gray-600 font-bold m-8'>Bienvenue UserName</div>

					<ActionIcon
						className='mr-8 mt-2'
						onClick={() => {
							auth.signOut();
						}}
						component={Link}
						to='/'
						size='xl'
						radius='xl'
						variant='outline'
						color='teal'>
						<IconPower size={32} />
					</ActionIcon>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default MenuWrapper;
