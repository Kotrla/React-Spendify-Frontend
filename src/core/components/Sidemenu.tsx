import AppBar from './AppBar';
import Drawer, { DrawerHeader } from './Drawer';
import { Box, CssBaseline } from '@mui/material';
import React, { useState, ReactNode } from 'react';
import { SidemenuItemsEnum } from '../../pages/AppLayout';

interface SidemenuProps {
	content: ReactNode;
	sidemenuItems: SidemenuItemsEnum[];
}

const Sidemenu: React.FC<SidemenuProps> = ({ content, sidemenuItems }) => {
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const MemoizedContent = React.memo(() => <>{content}</>);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
			<Drawer open={open} handleDrawerClose={handleDrawerClose} sidemenuItems={sidemenuItems} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<MemoizedContent />
			</Box>
		</Box>
	);
};

export default Sidemenu;
