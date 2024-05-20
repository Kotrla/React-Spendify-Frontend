import React from 'react';
import { Button, Box } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { RoutesEnum } from '../config/routes';

const AppLayout: React.FunctionComponent<any> = (): JSX.Element => {
	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Button variant="contained" component={Link} to="/">
					Landing
				</Button>
				<Button variant="contained" component={Link} to={RoutesEnum.HOME} sx={{ ml: 2 }}>
					Home
				</Button>
				<Button variant="contained" component={Link} to={RoutesEnum.PROFILE} sx={{ ml: 2 }}>
					Profile
				</Button>
			</Box>
			<Outlet />
		</Box>
	);
};

export default AppLayout;
