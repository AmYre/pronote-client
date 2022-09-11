import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
	const [produits, setProduits] = useState();

	let navigate = useNavigate();

	/* 	useEffect(() => {
		fetch('http://localhost:9000/produits')
			.then((res) => res.json())
			.then((data) => setProduits(data));
	}, []); */

	return (
		<>
			<div className='text-3xl font-bold underline'>Supervisor</div>

			{/* 			{produits ? (
				produits.map((produit) => (
					<>
						<div>{produit.nom}</div>
						<div>{produit.desc}</div>
					</>
				))
			) : (
				<p>Vos données chargent...</p>
			)} */}

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
