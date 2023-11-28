'use client';
import styles from './page.module.css';
import Osc1 from './components/Osc1';
import AppStateProvider from './context/AppStateContext';
import OnSwitch from './components/OnSwitch';

export default function Home() {
	return (
		<AppStateProvider>
			<div className={styles.container}>
				<div></div>
				<OnSwitch />
				<Osc1 />
			</div>
		</AppStateProvider>
	);
}
