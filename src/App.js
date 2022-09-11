import React from 'react';
import AuthProvider from './auth/AuthProvider';
import CheckAuth from './auth/CheckAuth';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route index element={<Login />} />
					<Route path='/home' element={<CheckAuth />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
