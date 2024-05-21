import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, Toolbar, IconButton, styled } from '@mui/material';

interface AppBarProps {
	open: boolean;
	handleDrawerOpen: () => void;
}

interface StyledAppBarProps {
	open: boolean;
}

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})<StyledAppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const AppBar: React.FC<AppBarProps> = ({ open, handleDrawerOpen }) => (
	<StyledAppBar position="fixed" open={open}>
		<Toolbar>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				edge="start"
				sx={{
					marginRight: 5,
					...(open && { display: 'none' }),
				}}>
				<MenuIcon />
			</IconButton>
		</Toolbar>
	</StyledAppBar>
);

export default AppBar;
