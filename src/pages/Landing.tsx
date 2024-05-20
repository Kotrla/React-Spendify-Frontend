import React from 'react';
import { createTheme } from '@mui/material/styles';
import { Avatar, Box, Container, CssBaseline, Grid, Paper, Typography } from '@mui/material';
import LoginPage from './Login';

// Define a custom theme with dark background color and orange for logo
const theme = createTheme({
	palette: {
		background: {
			default: '#2F4858', // Dark background color
		},
		primary: {
			main: '#F38819', // Logo color
		},
		text: {
			primary: '#fff', // Text color
		},
	},
});

const Landing: React.FC = () => {
	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1625225233840-695456021cde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<img src="/src/assets/spendify-logo.png" alt="Spendify Logo" />
			</Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Typography component="h1" variant="h5" sx={{ mb: 3 }}>
						Welcome to Spendify
					</Typography>
					<Typography variant="subtitle1" sx={{ mb: 3 }}>
						Your budget management made simple.
					</Typography>
					<LoginPage />
				</Box>
			</Grid>
		</Grid>
	);
};

export default Landing;
