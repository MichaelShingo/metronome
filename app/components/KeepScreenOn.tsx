import React, { useEffect, useState } from 'react';
import { useAppState } from '../context/AppStateContext';

const KeepScreenOn: React.FC = () => {
	const { state } = useAppState();
	const [navigatorObj, setNavigatorObj] = useState<Navigator | null>(null);
	let wakeLock: WakeLockSentinel | null;

	const lockWakeState = async () => {
		// if (!canWakeLock()) return;
		try {
			console.log('nav obj', navigatorObj);
			wakeLock = navigatorObj && (await navigatorObj.wakeLock.request());
			console.log(wakeLock);
			wakeLock &&
				wakeLock.addEventListener('release', () => {
					console.log('Screen wake state locked.', wakeLock && wakeLock.released);
				});
			console.log('Screen wake state locked.', wakeLock && !wakeLock.released);
		} catch (error: unknown) {
			console.error('Failed to lock wake staet with reason:', error);
		}
	};

	const releaseWakeState = () => {
		if (wakeLock) {
			wakeLock.release();
		}
		wakeLock = null;
		console.log('Wake state released.');
	};

	useEffect(() => {
		console.log('weblock object, nav', navigator.wakeLock, navigator);
		setNavigatorObj(navigator);
	}, []);

	useEffect(() => {
		if (state.metro_on) {
			lockWakeState();
		} else {
			releaseWakeState();
		}
	}, [state.metro_on]);

	return <></>;
};

export default KeepScreenOn;
