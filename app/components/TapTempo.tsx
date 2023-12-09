import { Button, Tooltip, Typography } from '@mui/material';
import { MAX_TEMPO, actions, useAppState } from '../context/AppStateContext';
import { useEffect, useRef } from 'react';
const styles = {
	width: '100%',
	height: 'fit-content',
	color: 'white',
	zIndex: '5',
	borderRadius: '25%',
	'&:hover': {
		color: 'primary.light',
		backgroundColor: 'none',
	},
	// backgroundColor: 'grey[600]',
};
const TapTempo = () => {
	const { state, dispatch } = useAppState();
	const tempo = state.tempo;
	const tapTimes: Date[] = state.tap_times;
	const buttonRef = useRef(null);

	const handleTap = () => {
		dispatch({ type: actions.DETECT_TAP });

		tapTimes.push(new Date()); // this should be a state update
		const difference: number =
			tapTimes[tapTimes.length - 1].getTime() - tapTimes[0].getTime();
		const totalTaps: number = tapTimes.length;
		const seconds: number = difference / 1000;
		const proportionToMinute: number = 60 / seconds;
		const bpm: number = totalTaps * proportionToMinute;
		console.log(
			`total taps = ${totalTaps} diff in seconds = ${seconds} proportion to minutes = ${proportionToMinute} BPM = ${bpm}`
		);
		const roundedBPM: number = Math.round(bpm);
		if (totalTaps >= 4) {
			dispatch({
				type: actions.TEMPO,
				payload: roundedBPM <= MAX_TEMPO ? roundedBPM : MAX_TEMPO,
			});
		}
	};

	const handleKeyPress = (event: KeyboardEvent): void => {
		if (event.key === 't') {
			handleTap();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
	return (
		<>
			<Tooltip title="Tap Tempo (T)" placement="bottom">
				<Button ref={buttonRef} sx={styles} onClick={handleTap}>
					<Typography sx={{ ml: '20px', mr: '20px' }} variant="h1">
						{tempo}
					</Typography>
				</Button>
			</Tooltip>
		</>
	);
};

export default TapTempo;
