import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Products from '../pages/Products';
import AppLayout from '../pages/AppLayout';
import ProtectedRoute from './protectedRoute';
import { Route, Routes } from 'react-router-dom';

const AppRoute: React.FunctionComponent<any> = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route
					path="profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path="products"
					element={
						<ProtectedRoute>
							<Products />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Home />} />
			</Route>
		</Routes>
	);
};

export default AppRoute;
