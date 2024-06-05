import React, { ReactElement } from 'react';
import { Button, Box } from '@mui/material';
import { RoutesEnum } from '../core/routes/routes';
import { Outlet, Link } from 'react-router-dom';
import Sidemenu from '../core/components/Sidemenu';
import { AccountBox, BarChart, CreditCard, RequestQuote } from '@mui/icons-material';

export interface ISidemenuItems {
	text: string;
	icon: ReactElement;
	url: RoutesEnum;
}

const sidemenuItems: ISidemenuItems[] = [
	{
		text: 'Dashboard',
		icon: <BarChart />,
		url: RoutesEnum.HOME,
	},
	{
		text: 'Spending',
		icon: <CreditCard />,
		url: RoutesEnum.SPENDING,
	},
	{
		text: 'Investments',
		icon: <RequestQuote />,
		url: RoutesEnum.INVESTMENTS,
	},
	{
		text: 'Profile',
		icon: <AccountBox />,
		url: RoutesEnum.PROFILE,
	},
];

const AppLayout: React.FunctionComponent = (): JSX.Element => {
	return (
		<Box>
			<Sidemenu sidemenuItems={sidemenuItems}>
				<>
					<Box sx={{ mb: 2 }}>
						<Button variant="contained" component={Link} to="/">
							Landing
						</Button>
					</Box>
					<Outlet />
				</>
			</Sidemenu>
		</Box>
	);
};

export default AppLayout;
