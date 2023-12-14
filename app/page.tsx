'use client';
import AppStateProvider from './context/AppStateContext';
import Tempo from './components/Tempo';
import StartButton from './components/StartButton';
import { Box, Stack } from '@mui/material';
import Settings from './components/Settings';
import Drone from './components/Drone';
import KeyPressHandler from './components/KeyPressHandler';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/darkTheme';
import AudioComponent from './components/AudioComponent';
import Flash from './components/Flash';
import DroneAudio from './components/DroneAudio';
import TapTempoTimeout from './components/TapTempoTimeout';
import BeatsContainer from './components/BeatsContainer';
export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<AppStateProvider>
				<Flash />
				<TapTempoTimeout />
				<KeyPressHandler />
				<AudioComponent />
				<DroneAudio />
				<Box
					component="div"
					data-label="app-container"
					sx={{
						backgroundColor: 'none',
						color: 'white',
						overflowX: 'hidden',
						overflowY: 'hidden',
						height: '100vh',
						width: '100vw',
						mt: '0px',
						mb: '0px',
						pt: '1%',
						pb: '0%',
						ml: '50%',
						mr: '50%',
						transform: 'translateX(-50%)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Tempo />
					<BeatsContainer />
					<StartButton />
					<Stack
						direction="row"
						spacing={'8%'}
						alignItems="center"
						justifyContent="center"
						sx={{
							backgroundColor: 'none',
							width: '100%',
							height: '14vh',
							overflowY: 'hidden',
							overflowX: 'hidden',
							pb: '0.5%',
						}}
					>
						<Settings />
						<Drone />
					</Stack>
				</Box>
			</AppStateProvider>
		</ThemeProvider>
	);
}
