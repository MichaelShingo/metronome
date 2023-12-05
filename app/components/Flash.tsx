import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
const Flash: React.FC = () => {
	const { state } = useAppState();
	const [animationKey, setAnimationKey] = useState(0);
	const currentBeat = state.current_beat;
	const flash = state.flash;
	console.log('flash');

	const styles = {
		visibility: flash ? 'visible' : 'hidden',
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: '1',
		opacity: '0',
		pointerEvents: 'none',
		animation: 'flashAnimation 0.1s linear',
		'@keyframes flashAnimation': {
			'0%': {
				opacity: '0',
			},
			'1%': {
				opacity: '1',
			},
			'100%': {
				opacity: '0',
			},
		},
	};

	useEffect(() => {
		setAnimationKey((prevKey) => prevKey + 1);
	}, [currentBeat]);
	return <Box key={animationKey} sx={styles}></Box>;
};

export default Flash;
