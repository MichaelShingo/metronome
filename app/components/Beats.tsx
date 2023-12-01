import { IconButton, Stack } from '@mui/material';
import { actions, useAppState } from '../context/AppStateContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from 'styled-components';
import { useTheme } from '@mui/material';
const BeatCircle = styled.div`
	width: 4vh;
	height: 4vh;
	border-radius: 50%;
`;

const Beats = () => {
	const theme = useTheme();

	const { state, dispatch } = useAppState();
	const beats = state.beats;
	const currentBeat = state.current_beat;

	const displayBeats = (beats: number, currentBeat: number): JSX.Element[] => {
		const res = [];
		for (let i = 1; i <= beats; i++) {
			res.push(
				<BeatCircle
					key={i}
					style={{
						backgroundColor:
							i === currentBeat
								? `${theme.palette.primary.light}`
								: `${theme.palette.grey[300]}`,
					}}
				></BeatCircle>
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
