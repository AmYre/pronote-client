import React, { useEffect, useState } from 'react';

const Header = () => {
	const [produits, setProduits] = useState();

	useEffect(() => {
		fetch('http://localhost:9000/produits')
			.then((res) => res.json())
			.then((data) => setProduits(data));
	}, []);

	return (
		<>
			<div className='text-3xl font-bold underline'>Header</div>

			{produits ? (
				produits.map((produit) => (
					<>
						<div>{produit.nom}</div>
						<div>{produit.desc}</div>
					</>
				))
			) : (
				<p>Vos données chargent...</p>
			)}
		</>
	);
};

export default Header;
