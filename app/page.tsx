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
						color: 'white',
						overflowX: 'hidden',
						overflowY: 'hidden',
						height: '100vh',
						width: '100vw',
						maxHeight: '100%',
						minHeight: 'fit-content',
						mt: '0px',
						mb: '0px',
						pt: '2vh',
						pb: '2vh',
						ml: '50%',
						mr: '50%',
						transform: 'translate(-50%)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Tempo />
					<BeatsContainer />
					<StartButton />
					<Stack
						direction="row"
						spacing={5}
						sx={{
							width: 'fit-content',
							overflowY: 'hidden',
							overflowX: 'hidden',
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
