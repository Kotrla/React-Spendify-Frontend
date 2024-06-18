import React from 'react';
import Home from '../../pages/Home';
import { RoutesEnum } from './routes';
import Profile from '../../pages/Profile';
import Landing from '../../pages/Landing';
import Spending from '../../pages/Spending';
import AppLayout from '../components/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import Investments from '../../pages/Investments';
import { Outlet, Route, Routes } from 'react-router-dom';

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
						path={RoutesEnum.SPENDING}
						element={
							<ProtectedRoute>
								<Spending />
							</ProtectedRoute>
						}
					/>
					<Route
						path={RoutesEnum.INVESTMENTS}
						element={
							<ProtectedRoute>
								<Investments />
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
