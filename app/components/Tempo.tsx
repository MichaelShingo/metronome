import { IconButton, Stack, Typography } from '@mui/material';
import { Slider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MAX_TEMPO, MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';

function getTempoMarking(tempo: number): string {
	if (tempo < 20 || tempo > 250) {
		throw new Error('Tempo out of range. Please provide a tempo between 20 and 250.');
	}

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
	return (
		<>
			<Slider
				min={MIN_TEMPO}
				max={MAX_TEMPO}
				valueLabelDisplay="off"
				aria-label="Frequency"
				value={tempo}
				onChange={handleChange}
			/>
			<Stack direction="row">
				<IconButton>
					<ArrowBackIosIcon />
				</IconButton>
				<Typography variant="h1">{tempo}</Typography>
				<IconButton>
					<ArrowForwardIosIcon />
				</IconButton>
			</Stack>
			<Typography variant="h3">{getTempoMarking(tempo)}</Typography>
		</>
	);
};

export default Tempo;
