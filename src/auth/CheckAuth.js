import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import MenuWrapper from '../components/MenuWrapper';

import Teacher from '../components/Teacher';
import Overseer from '../components/Overseer';
import Supervisor from '../components/Supervisor';

const CheckAuth = () => {
	const [user] = useAuthState(auth);

	const [supervisor, setSupervisor] = useState(false);
	const [teacher, setTeacher] = useState(false);
	const [overseer, setOverseer] = useState(false);

	useEffect(() => {
		if (user) {
			if (user.email === 'supervisor@ispe-pronote.fr') {
				setSupervisor(true);
			}
			if (user.email === 'teacher@ispe-pronote.fr') {
				setTeacher(true);
			}
			if (user.email === 'overseer@ispe-pronote.fr') {
				setOverseer(true);
			}
		}
	}, [user]);

	return (
		<>
			{user ? (
				<div className='bg-white h-screen'>
					{supervisor && (
						<MenuWrapper>
							<Supervisor />
						</MenuWrapper>
					)}
					{teacher && <Teacher />}
					{overseer && <Overseer />}
				</div>
			) : (
				<p>Nous chargeons votre page</p>
			)}
		</>
	);
};

export default CheckAuth;
