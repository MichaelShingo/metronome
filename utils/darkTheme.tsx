import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#1976d2',
			light: '#42a5f5',
			dark: '#1565c0',
		},
		background: {
			paper: '#001429',
			default: '#001429',
		},
		grey: {
			50: '#005cf0',
			100: '#0052d6',
			200: '#0044b3',
			300: '#305a9c',
			400: '#002e78',
			500: '#00235c',
			600: '#001942',
			700: '#001330',
			800: '#000b1c',
			900: '#00060f',
		},
	},
	typography: {
		fontFamily: 'Helvetica',
		h1: {
			fontSize: '18vh',
		},
		h3: {},
		button: {
			fontSize: '5rem',
		},
	},
});

export default theme;
