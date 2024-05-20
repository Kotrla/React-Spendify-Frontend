import React from 'react';
import { Button, Box } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

const AppLayout: React.FunctionComponent<any> = (): JSX.Element => {
	return (
		<Box>
			<Box sx={{ mb: 2 }}>
				<Button variant="contained" component={Link} to="/">
					Home
				</Button>
				<Button variant="contained" component={Link} to="/profile" sx={{ ml: 2 }}>
					Profile
				</Button>
				<Button variant="contained" component={Link} to="/products" sx={{ ml: 2 }}>
					Products
				</Button>
				<Button variant="contained" component={Link} to="/login" sx={{ ml: 2 }}>
					Login
				</Button>
			</Box>
			<Outlet />
		</Box>
	);
};

export default AppLayout;
