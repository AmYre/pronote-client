import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
	const [resits, setResits] = useState();
	const [selectedResit, setSelectedResit] = useState();
	const [grades, setGrades] = useState();
	const [overseers, setOverseers] = useState();
	const [teachers, setTeachers] = useState();
	const [step, setStep] = useState('resitsList');
	const [action, setAction] = useState('null');

	useEffect(() => {
		fetch('http://localhost:9000/resits')
			.then((res) => res.json())
			.then((data) => setResits(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/grades')
			.then((res) => res.json())
			.then((data) => setGrades(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/overseers')
			.then((res) => res.json())
			.then((data) => setOverseers(data))
			.catch((err) => console.log('catched fetch error :', err));

		fetch('http://localhost:9000/teachers')
			.then((res) => res.json())
			.then((data) => setTeachers(data))
			.catch((err) => console.log('catched fetch error :', err));
	}, [action]);

	return (
		<GlobalContext.Provider
			value={{
				resits,
				setResits,
				selectedResit,
				setSelectedResit,
				grades,
				setGrades,
				overseers,
				setOverseers,
				teachers,
				setTeachers,
				step,
				setStep,
				action,
				setAction,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { ContextProvider, useGlobalContext };
