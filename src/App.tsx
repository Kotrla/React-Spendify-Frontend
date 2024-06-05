import './App.scss';
import AppRoute from './core/routes/AppRoute';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#F38819',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: '#303035',
			paper: '#252525',
		},
		info: {
			main: '#f6b729',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<AppRoute />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
