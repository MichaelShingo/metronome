import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
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

	function mapRange(
		value: number,
		fromMin: number,
		fromMax: number,
		toMin: number,
		toMax: number
	): number {
		// Ensure that the value is within the original range
		const clampedValue = Math.max(fromMin, Math.min(value, fromMax));

		// Calculate the normalized value in the original range (0 to 1)
		const normalizedValue = (clampedValue - fromMin) / (fromMax - fromMin);

		// Map the normalized value to the target range
		const mappedValue = normalizedValue * (toMax - toMin) + toMin;

		return mappedValue;
	}

	const displayBeats = (beats: number, currentBeat: number): JSX.Element[] => {
		const res = [];
		for (let i = 0; i < beats; i++) {
			res.push(
				<Tooltip title={`(${i + 1})`} placement="top">
					<Button
						key={i}
						onClick={() => handleBeatClick(i)}
						style={{
							minWidth: `${mapRange(beats, 1, 21, 70, 15)}px`,
							width: `${mapRange(beats, 1, 21, 70, 15)}px`,
							paddingRight: '2px',
							paddingLeft: '2px',
							marginLeft: `${mapRange(beats, 1, 21, 4, 0)}px`,
							marginRight: `${mapRange(beats, 1, 21, 4, 0)}px`,
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
				</Tooltip>
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
				<Tooltip title="-Beat (Shift + L Arrow)">
					<IconButton size="large" onClick={() => handleClick(false)}>
						<RemoveCircleIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="+Beat (Shift + R Arrow)">
					<IconButton size="large" onClick={() => handleClick(true)}>
						<AddCircleIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</>
	);
};

export default Beats;
