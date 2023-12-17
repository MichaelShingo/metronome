import { Box } from '@mui/system';
import { ReactNode } from 'react';

interface AppContainerProps {
	children: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return (
		<Box
			data-label="app-container"
			component="div"
			sx={{
				backgroundColor: 'none',
				color: 'white',
				overflowX: 'hidden',
				overflowY: 'auto',
				height: '100vh',
				width: '100vw',
				mt: '0px',
				mb: '0px',
				pt: '0%',
				pb: '0%',
				ml: '50%',
				mr: '50%',
				transform: 'translateX(-50%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{children}
		</Box>
	);
};

export default AppContainer;
