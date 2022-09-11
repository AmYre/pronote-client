import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
	const [produits, setProduits] = useState();

	let navigate = useNavigate();

	return (
		<>
			<div className='text-3xl font-bold underline'>Teacher</div>

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
