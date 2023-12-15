import { Stack } from '@mui/material';
import { Slider } from '@mui/material';

import { MAX_TEMPO, MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';
import TapTempo from './TapTempo';
import TempoArrow from './TempoArrow';

export const getTempoMarking = (tempo: number): string => {
	if (tempo < 20) {
		return 'Larghissimo';
	} else if (tempo <= 40) {
		return 'Grave';
	} else if (tempo <= 45) {
		return 'Lento';
	} else if (tempo <= 50) {
		return 'Largo';
	} else if (tempo <= 55) {
		return 'Larghetto';
	} else if (tempo <= 65) {
		return 'Adagio';
	} else if (tempo <= 69) {
		return 'Adagietto';
	} else if (tempo <= 77) {
		return 'Andante';
	} else if (tempo <= 83) {
		return 'Andantino';
	} else if (tempo <= 85) {
		return 'Marcia moderato';
	} else if (tempo <= 97) {
		return 'Moderato';
	} else if (tempo <= 109) {
		return 'Allegretto';
	} else if (tempo <= 132) {
		return 'Allegro';
	} else if (tempo <= 140) {
		return 'Vivace';
	} else if (tempo <= 150) {
		return 'Vivacissimo';
	} else if (tempo <= 167) {
		return 'Allegrissimo';
	} else if (tempo <= 177) {
		return 'Presto';
	} else {
		return 'Prestissimo';
	}
};

const Tempo: React.FC = () => {
	const { state, dispatch } = useAppState();
	const tempo: number = state.tempo;

	const handleChange = (e: Event, newValue: number | number[]): void => {
		dispatch({ type: actions.TEMPO, payload: newValue as number });
	};

	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="end"
			spacing="2%"
			sx={{
				height: '29%',
				width: '100%',
				backgroundColor: 'none',
			}}
		>
			<Stack
				justifyContent="center"
				direction="row"
				alignItems="center"
				sx={{
					height: '25%',
					width: '95vw',
					maxWidth: '450px',
					marginBottom: '0px',
					zIndex: 3,
					backgroundColor: 'none',
				}}
			>
				<TempoArrow increment={false} />
				<Slider
					min={MIN_TEMPO}
					max={MAX_TEMPO}
					valueLabelDisplay="off"
					aria-label="Frequency"
					value={tempo}
					onChange={handleChange}
					size={state.window_height < 500 ? 'small' : 'medium'}
					sx={{ width: '80%', marginLeft: '10px', marginRight: '10px' }}
				/>
				<TempoArrow increment={true} />
			</Stack>
			<Stack
				data-label="tempo-container"
				alignItems="center"
				alignContent="center"
				sx={{
					width: '100%',
					height: '75%',
					backgroundColor: 'none',
					marginTop: '0px !important',
				}}
			>
				<Stack
					data-label="tempo-row"
					direction="row"
					alignItems="center"
					justifyContent="space-evenly"
					spacing="5"
					sx={{
						mt: '0px',
						height: '100%',
						width: '95%',
						maxWidth: `700px`,
						backgroundColor: 'none',
						border: '1px solid none',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<TapTempo />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Tempo;
