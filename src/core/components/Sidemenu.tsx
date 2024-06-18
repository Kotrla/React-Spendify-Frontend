import AppBar from './AppBar';
import Drawer, { DrawerHeader } from './Drawer';
import { Box, CssBaseline } from '@mui/material';
import { ISidemenuItems } from './AppLayout';
import React, { useState, PropsWithChildren } from 'react';

interface ISidemenuProps {
	sidemenuItems: ISidemenuItems[];
}

const Sidemenu: React.FC<PropsWithChildren<ISidemenuProps>> = ({ children, sidemenuItems }) => {
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const MemoizedChildren = React.memo(() => <>{children}</>);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
			<Drawer open={open} handleDrawerClose={handleDrawerClose} sidemenuItems={sidemenuItems} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<MemoizedChildren />
			</Box>
		</Box>
	);
};

export default Sidemenu;
