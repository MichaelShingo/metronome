import { Box, Button, IconButton, Stack } from '@mui/material';
import { actions, useAppState } from '../context/AppStateContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTheme } from '@mui/material';

const Beats = () => {
	const theme = useTheme();
	const { state, dispatch } = useAppState();
	const beats = state.beats;
	const currentBeat = state.current_beat;

	const calculateBeatSize = (beatPitch: number): string => {
		switch (beatPitch) {
			case 0:
				return '10';
			case 1:
				return '40';
			case 2:
				return '70';
			case 3:
				return '100';
			default:
				return '100';
		}
	};

	const handleBeatClick = (beatNum: number) => {
		dispatch({ type: actions.BEAT_MAP, payload: beatNum });
	};

	const displayBeats = (beats: number, currentBeat: number): JSX.Element[] => {
		const res = [];
		for (let i = 0; i < beats; i++) {
			res.push(
				<Button
					key={i}
					onClick={() => handleBeatClick(i)}
					style={{
						width: '6vh',
						height: '6vh',
					}}
				>
					<Box
						sx={{
							width: '100%',
							height: calculateBeatSize(state.beat_map[i]) + '%',
							borderRadius: '4px',
							backgroundColor:
								i === currentBeat
									? `${theme.palette.primary.light}`
									: `${theme.palette.grey[300]}`,
						}}
					></Box>
				</Button>
			);
		}
		return res;
	};

	const handleClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_BEATS });
		} else {
			dispatch({ type: actions.DECREASE_BEATS });
		}
	};
	return (
		<>
			<Stack direction="row" spacing={2} sx={{ mt: '15px' }}>
				{displayBeats(beats, currentBeat)}
			</Stack>
			<Stack direction="row">
				<IconButton size="large" onClick={() => handleClick(false)}>
					<RemoveCircleIcon />
				</IconButton>
				<IconButton size="large" onClick={() => handleClick(true)}>
					<AddCircleIcon />
				</IconButton>
			</Stack>
		</>
	);
};

export default Beats;
