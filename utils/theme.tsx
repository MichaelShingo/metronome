import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: colors.orange[500],
		},
	},
	typography: {
		fontFamily: 'Helvetica',
		h1: {
			color: 'black',
		},
		h3: {
			color: 'black',
		},
		button: {
			fontSize: '5rem',
		},
	},
});

export default theme;
