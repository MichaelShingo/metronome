'use client';
import AppStateProvider from './context/AppStateContext';
import Tempo from './components/Tempo';
import StartButton from './components/StartButton';
import { Box, Stack } from '@mui/material';
import Settings from './components/Settings';
import Drone from './components/Drone';

export default function Home() {
	return (
		<AppStateProvider>
			<Box
				sx={{
					backgroundColor: 'white',
					height: '90vh',
					width: '90vw',
					mt: '0px',
					mb: '20px',
					p: '50px',
					ml: '50%',
					mr: '50%',
					transform: 'translate(-50%)',
				}}
			>
				<Box
					sx={{
						bgColor: 'darkgrey',
						color: 'white',
						minHeight: 'fit-content',
						maxHeight: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Tempo />
					<StartButton />
					<Stack direction="row" sx={{ w: 'fit-content' }}>
						<Settings />
						<Drone />
					</Stack>
				</Box>
			</Box>
		</AppStateProvider>
	);
}
