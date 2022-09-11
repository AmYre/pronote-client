import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [password, setPassword] = useState({
		firstPassword: '',
		secondPassword: '',
	});
	const [activeBtn, setActiveBtn] = useState(false);
	const [users, setUsers] = useState([]);
	const [formations, setFormations] = useState([]);
	const [modal, setModal] = useState(false);
	const [modalForma, setModalForma] = useState(false);
	const [isFetched, setIsFetched] = useState(false);

	return (
		<AppContext.Provider
			value={{
				password,
				setPassword,
				activeBtn,
				setActiveBtn,
				users,
				setUsers,
				modal,
				setModal,
				formations,
				setFormations,
				isFetched,
				setIsFetched,
				modalForma,
				setModalForma,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
