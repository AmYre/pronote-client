import React from 'react';
import { TextInput } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import bg from '../img/bg-full.png';

const Login = () => {
	return (
		<>
			<img className='absolute h-full object-cover' src={bg} alt='background z-1' />
			<main className='h-screen flex text-black'>
				<section className='z-10'>
					<h2>Welcome</h2>

					<p>L'excellence digitalisée</p>
				</section>
				<section className='flex justify-center items-center z-10'>
					<h1>Connectez-vous</h1>

					<TextInput label='Your email' placeholder='Your email' rightSection={<IconAt size='xs' />} />
					<TextInput label='Your email' placeholder='Your email' rightSection={<IconAt size='xs' />} />

					<button>Connexion</button>
					<p>Mot de passe oublié ?</p>
				</section>
			</main>
		</>
	);
};

export default Login;
