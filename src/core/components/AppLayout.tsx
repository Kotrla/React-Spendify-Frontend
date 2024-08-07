import Sidemenu from './Sidemenu';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { RoutesEnum } from '../routes/routes';
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
				<Outlet />
			</Sidemenu>
		</Box>
	);
};

export default AppLayout;
