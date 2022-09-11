import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import bg from '../img/bg-full.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		auth.signInWithEmailAndPassword(email, password).then(navigate(`/home`)).catch(setError('Votre e-mail ou votre mot de passe est incorrect.'));
	};

	return (
		<>
			<h1>Connectez-vous</h1>
			<img className='absolute h-full object-cover' src={bg} alt='background z-1' />
			<main className='h-screen flex text-black'>
				<section className='z-10'>
					<h2>Welcome</h2>

					<p>L'excellence digitalisée</p>
				</section>
				<section className='flex justify-center items-center z-10'>
					<h1>Connectez-vous</h1>

					<input value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
					<input value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
					{error && <p className='text-xs text-blue-500'>{error}</p>}
					<div className='flex flex-col justify-center items-center'>
						<button onClick={handleSubmit} className='mt-5 py-2 px-4 text-sm bg-blue-500 text-black rounded focus:outline-none hover:bg-yellow-400 transition duration-200'>
							Se connecter
						</button>
					</div>

					<p>Mot de passe oublié ?</p>
				</section>
			</main>
		</>
	);
};

export default Login;
