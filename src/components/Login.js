import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import Teacher from '../components/Teacher';
import Overseer from '../components/Overseer';
import Supervisor from '../components/Supervisor';

import { TextInput } from '@mantine/core';
import { IconShieldCheck } from '@tabler/icons';
import { IconAt } from '@tabler/icons';
import bg from '../img/bg-full.png';
import logo from '../img/logo.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const [user] = useAuthState(auth);
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		auth.signInWithEmailAndPassword(email, password)
		.then(navigate(`/home`))
		.catch(setError('Votre e-mail ou votre mot de passe est incorrect.'));
	};

	return (
		<>
			<img className='absolute h-full object-cover' src={bg} alt='background z-1' />
			<main className='h-screen flex text-black bg-[#F5F5F5]'>
				<section className='relative z-10 w-full'>
					<h2 className='custom-orientation'>Bienvenue</h2>

					<img src={logo} alt='logo' className='w-40 absolute right-0 top-10' />
					<p className='absolute bottom-10 left-10 text-xl font-thin text-teal-100'>ISPE PRONOTE - AU SERVICE DE L'EXCELLENCE SCOLAIRE</p>
				</section>
				<section className='w-full flex flex-col items-center justify-center gap-10 z-10'>
					<h1 className='text-4xl font-bold text-teal-500'>Connectez-vous</h1>

					<TextInput className='focus:outline-none' styles={{ input: { border: 'none', backgroundColor: '#F5F5F5', borderBottom: '2px solid #3CC3BE', borderRadius: '0' }, rightSection: { color: '#3CC3BE', padding: '8px' } }} value={email} type='email' onChange={(e) => setEmail(e.target.value)} rightSection={<IconAt />} />
					<TextInput styles={{ input: { border: 'none', backgroundColor: '#F5F5F5', borderBottom: '2px solid #3CC3BE', borderRadius: '0' }, rightSection: { color: '#3CC3BE', padding: '8px' } }} value={password} type='password' onChange={(e) => setPassword(e.target.value)} rightSection={<IconShieldCheck />} />
					{error && <p className='text-xs text-blue-500'>{error}</p>}
					<div className='flex flex-col justify-center items-center'>
						<button onClick={handleSubmit} className='mt-5 py-3 px-12 font-medium bg-teal-500 text-white rounded-full shadow-md shadow-[#3CC3BE] hover:bg-teal-400 transition duration-200'>
							Se connecter
						</button>
					</div>

					<button
						onClick={() => {
							auth.signOut();
							navigate(`/`);
						}}>
						<p className='text-xs'>Mot de passe oublié ? </p>
					</button>
				</section>
			</main>
		</>
	);
};

export default Login;
