'use client';
import AppStateProvider from './context/AppStateContext';
import Tempo from './components/Tempo';
import StartButton from './components/StartButton';
import KeyPressHandler from './components/KeyPressHandler';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/darkTheme';
import AudioComponent from './components/AudioComponent';
import Flash from './components/Flash';
import DroneAudio from './components/DroneAudio';
import TapTempoTimeout from './components/TapTempoTimeout';
import BeatsContainer from './components/BeatsContainer';
import SettingsDroneRow from './components/SettingsDroneRow';
import AppContainer from './components/AppContainer';

export default function Home() {
	return (
		<ThemeProvider theme={theme}>
			<AppStateProvider>
				<Flash />
				<TapTempoTimeout />
				<KeyPressHandler />
				<AudioComponent />
				<DroneAudio />
				<AppContainer>
					<Tempo />
					<BeatsContainer />
					<StartButton />
					<SettingsDroneRow />
				</AppContainer>
			</AppStateProvider>
		</ThemeProvider>
	);
}
