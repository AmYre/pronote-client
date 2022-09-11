import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
	let navigate = useNavigate();

	return (
		<>
			<h1 className='text-3xl font-bold underline'>Overseer</h1>

			<button
				onClick={() => {
					auth.signOut();
					navigate(`/`);
				}}>
				Déconnexion
			</button>
		</>
	);
};

export default Header;
