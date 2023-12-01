import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Slider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MAX_TEMPO, MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';

const arrowContainerStyles = {
	width: '12vh',
	height: '12vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
};

const arrowStyles = {
	width: '9vh',
	height: '9vh',
	textAlign: 'center',
};
function getTempoMarking(tempo: number): string {
	if (tempo <= 40) {
		return 'Grave';
	} else if (tempo <= 60) {
		return 'Adagio';
	} else if (tempo <= 80) {
		return 'Andante';
	} else if (tempo <= 120) {
		return 'Allegro';
	} else if (tempo <= 168) {
		return 'Presto';
	} else {
		return 'Prestissimo';
	}
}
const Tempo: React.FC = () => {
	const { state, dispatch } = useAppState();
	const tempo: number = state.tempo;

	const handleChange = (e: Event, newValue: number | number[]): void => {
		dispatch({ type: actions.TEMPO, payload: newValue as number });
	};

	const handleArrowClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_TEMPO });
		} else {
			dispatch({ type: actions.DECREASE_TEMPO });
		}
	};
	return (
		<>
			<Box sx={{ width: '80vw', maxWidth: '300px' }}>
				<Slider
					min={MIN_TEMPO}
					max={MAX_TEMPO}
					valueLabelDisplay="off"
					aria-label="Frequency"
					value={tempo}
					onChange={handleChange}
					size="medium"
				/>
			</Box>
			<Stack direction="row" alignItems="center" alignContent="center">
				<Tooltip title="-Tempo (L Arrow Key)">
					<IconButton onClick={() => handleArrowClick(false)} sx={arrowContainerStyles}>
						<ArrowBackIosIcon
							sx={{ ...arrowStyles, position: 'relative', left: '1.5vh' }}
						/>
					</IconButton>
				</Tooltip>
				<Typography variant="h1">{tempo}</Typography>
				<Tooltip title="+Tempo (R Arrow Key)">
					<IconButton onClick={() => handleArrowClick(true)} sx={arrowContainerStyles}>
						<ArrowForwardIosIcon sx={arrowStyles} />
					</IconButton>
				</Tooltip>
			</Stack>
			<Typography variant="h3">{getTempoMarking(tempo)}</Typography>
		</>
	);
};

export default Tempo;
