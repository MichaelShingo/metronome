import { Stack } from '@mui/material';
import { Slider } from '@mui/material';

import { MAX_TEMPO, MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';
import TapTempo from './TapTempo';
import TempoArrow from './TempoArrow';

export const TEMPO_MAP: Record<string, [string, number]> = {
	LARGHISSIMO: ['Larghissimo', MIN_TEMPO],
	GRAVE: ['Grave', 20],
	LENTO: ['Lento', 41],
	LARGO: ['Largo', 46],
	LARGHETTO: ['Larghetto', 51],
	ADAGIO: ['Adagio', 56],
	ADAGIETTO: ['Adagietto', 66],
	ANDANTE: ['Andante', 70],
	ANDANTINO: ['Andantino', 78],
	MODERATO: ['Moderato', 86],
	ALLEGRETTO: ['Allegretto', 98],
	ALLEGRO: ['Allegro', 110],
	VIVACE: ['Vivace', 133],
	VIVACISSIMO: ['Vivacissimo', 141],
	ALLEGRISSIMO: ['Allegrissimo', 151],
	PRESTO: ['Presto', 168],
	PRESTISSIMO: ['Prestissimo', 178],
};

export const getTempoMarking = (tempo: number): string => {
	if (tempo < TEMPO_MAP.GRAVE[1]) {
		return TEMPO_MAP.LARGHISSIMO[0];
	} else if (tempo < TEMPO_MAP.LENTO[1]) {
		return TEMPO_MAP.GRAVE[0];
	} else if (tempo < TEMPO_MAP.LARGO[1]) {
		return TEMPO_MAP.LENTO[0];
	} else if (tempo < TEMPO_MAP.LARGHETTO[1]) {
		return TEMPO_MAP.LARGO[0];
	} else if (tempo < TEMPO_MAP.ADAGIO[1]) {
		return TEMPO_MAP.LARGHETTO[0];
	} else if (tempo < TEMPO_MAP.ADAGIETTO[1]) {
		return TEMPO_MAP.ADAGIO[0];
	} else if (tempo < TEMPO_MAP.ANDANTE[1]) {
		return TEMPO_MAP.ADAGIETTO[0];
	} else if (tempo < TEMPO_MAP.ANDANTINO[1]) {
		return TEMPO_MAP.ANDANTE[0];
	} else if (tempo < TEMPO_MAP.MODERATO[1]) {
		return TEMPO_MAP.ANDANTINO[0];
	} else if (tempo < TEMPO_MAP.ALLEGRETTO[1]) {
		return TEMPO_MAP.MODERATO[0];
	} else if (tempo < TEMPO_MAP.ALLEGRO[1]) {
		return TEMPO_MAP.ALLEGRETTO[0];
	} else if (tempo < TEMPO_MAP.VIVACE[1]) {
		return TEMPO_MAP.ALLEGRO[0];
	} else if (tempo < TEMPO_MAP.VIVACISSIMO[1]) {
		return TEMPO_MAP.VIVACE[0];
	} else if (tempo < TEMPO_MAP.ALLEGRISSIMO[1]) {
		return TEMPO_MAP.VIVACISSIMO[0];
	} else if (tempo < TEMPO_MAP.PRESTO[1]) {
		return TEMPO_MAP.ALLEGRISSIMO[0];
	} else if (tempo < TEMPO_MAP.PRESTISSIMO[1]) {
		return TEMPO_MAP.PRESTO[0];
	} else {
		return TEMPO_MAP.PRESTISSIMO[0];
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
