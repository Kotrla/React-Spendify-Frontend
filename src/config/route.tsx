import React from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import AppLayout from '../pages/AppLayout';
import ProtectedRoute from './protectedRoute';
import { Outlet, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import { RoutesEnum } from './routes';

const AppRoute: React.FunctionComponent<any> = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<Outlet />}>
				<Route index element={<Landing />} />
				<Route
					path={RoutesEnum.APP}
					element={
						<ProtectedRoute>
							<AppLayout />
						</ProtectedRoute>
					}>
					<Route
						path={RoutesEnum.HOME}
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RoutesEnum.PROFILE}
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path="*" element={<Landing />} />
			</Route>
		</Routes>
	);
};

export default AppRoute;
