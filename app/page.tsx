'use client';
import styles from './page.module.css';
import Osc1 from './components/Osc1';
import AppStateProvider from './context/AppStateContext';
import Tempo from './components/Tempo';
import StartButton from './components/StartButton';
import { Stack } from '@mui/material';
import Settings from './components/Settings';
import Drone from './components/Drone';

export default function Home() {
	return (
		<AppStateProvider>
			<div className={styles.container}>
				<Tempo />
				<div></div>
				<StartButton />
				<Osc1 />
				<Stack direction="row">
					<Settings />
					<Drone />
				</Stack>
			</div>
		</AppStateProvider>
	);
}
