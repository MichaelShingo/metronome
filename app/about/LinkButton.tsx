'use client';

import { Button, useTheme } from '@mui/material';

const LinkButton = () => {
	const theme = useTheme();

	return (
		<Button
			variant="contained"
			sx={{
				width: '100%',
				marginTop: '20px',
				marginBottom: '20px',
				maxHeight: '130px',
				fontSize: '3.5rem',
				backgroundColor: theme.palette.common.mediumLight,
			}}
		>
			Go to the App
		</Button>
	);
};

export default LinkButton;
