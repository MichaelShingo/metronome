import { Button, Tooltip, Typography } from '@mui/material';
import { MAX_TEMPO, actions, useAppState } from '../context/AppStateContext';
import { useEffect, useRef } from 'react';
import { Stack } from '@mui/system';

const TapTempo = () => {
	const { state, dispatch } = useAppState();
	const tempo = state.tempo;
	const tapTimes: Date[] = state.tap_times;
	const buttonRef = useRef(null);

	const handleTap = () => {
		dispatch({ type: actions.DETECT_TAP });
		tapTimes.push(new Date());
		const difference: number =
			tapTimes[tapTimes.length - 1].getTime() - tapTimes[0].getTime();
		const totalTaps: number = tapTimes.length;
		const seconds: number = difference / 1000;
		const proportionToMinute: number = 60 / seconds;
		const bpm: number = totalTaps * proportionToMinute;
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
		<Stack
			justifyContent="center"
			alignItems="center"
			sx={{
				backgroundColor: 'none',
				height: '100%',
				width: '50%',
			}}
		>
			<Tooltip title="Tap Tempo (T)" placement="right">
				<Button
					ref={buttonRef}
					sx={{
						backgroundColor: 'common.shadow',
						minWidth: 'fit-content',
						width: 'fit-content',
						height: '80%',
						maxHeight: '175px',
						color: 'white',
						zIndex: '5',
						padding: '5px',
						'&:hover': {
							color: 'primary.light',
							backgroundColor: 'none',
						},
					}}
					onClick={handleTap}
				>
					<Typography
						sx={{
							fontSize: state.window_width < 230 ? '60vw' : '17vh',
						}}
						variant="h1"
					>
						{tempo}
					</Typography>
				</Button>
			</Tooltip>
		</Stack>
	);
};

export default TapTempo;
