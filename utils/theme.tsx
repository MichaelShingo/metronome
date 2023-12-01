import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
		},
	},
	typography: {
		fontFamily: 'Helvetica',
		h1: {},
		h3: {},
		button: {
			fontSize: '5rem',
		},
	},
});

export default theme;
