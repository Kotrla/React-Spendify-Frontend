import React from 'react';
import { Link } from 'react-router-dom';
import useUrlContains from '../hooks/useUrlContains';
import { ISidemenuItems } from '../../pages/AppLayout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
	Drawer as MuiDrawer,
	Box,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	styled,
	CSSObject,
	Theme,
	useTheme,
} from '@mui/material';

interface IDrawerProps {
	open: boolean;
	handleDrawerClose: () => void;
	sidemenuItems: ISidemenuItems[];
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const Drawer: React.FC<IDrawerProps> = ({ open, handleDrawerClose, sidemenuItems }) => {
	const theme = useTheme();
	const urlContainsArray = sidemenuItems.map(item => useUrlContains(item.url));

	return (
		<StyledDrawer variant="permanent" open={open}>
			<DrawerHeader>
				<img src="../../src/assets/spendify-logo.png" alt="logo-header" loading="lazy" />
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{sidemenuItems.map((sidemenuItem, index) => (
					<ListItem key={sidemenuItem.text} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							component={Link}
							to={sidemenuItem.url}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
								position: 'relative',
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}>
								{sidemenuItem.icon}
							</ListItemIcon>
							<ListItemText primary={sidemenuItem.text} sx={{ opacity: open ? 1 : 0 }} />
							{urlContainsArray[index] && (
								<Box
									sx={{
										position: 'absolute',
										top: 0,
										bottom: 0,
										right: 0,
										width: 4,
										backgroundColor: '#F38819',
									}}
								/>
							)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</StyledDrawer>
	);
};

export default Drawer;
