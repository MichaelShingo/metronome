'use client';
import AppStateProvider from './context/AppStateContext';
import Tempo from './components/Tempo';
import StartButton from './components/StartButton';
import { Box } from '@mui/material';
import KeyPressHandler from './components/KeyPressHandler';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/darkTheme';
import AudioComponent from './components/AudioComponent';
import Flash from './components/Flash';
import DroneAudio from './components/DroneAudio';
import TapTempoTimeout from './components/TapTempoTimeout';
import BeatsContainer from './components/BeatsContainer';
import SettingsDroneRow from './components/SettingsDroneRow';
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
					data-label="app-container"
					component="div"
					sx={{
						backgroundColor: 'none',
						color: 'white',
						overflowX: 'hidden',
						overflowY: 'hidden',
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
					<Tempo />
					<BeatsContainer />
					<StartButton />
					<SettingsDroneRow />
				</Box>
			</AppStateProvider>
		</ThemeProvider>
	);
}
