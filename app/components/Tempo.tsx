import {
	Box,
	IconButton,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { Slider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MAX_TEMPO, MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';
import TapTempo from './TapTempo';

const arrowContainerStyles = {
	width: 'fit-content',
	height: 'fit-content',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
};

function getTempoMarking(tempo: number): string {
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
	} else if (tempo <= 72) {
		return 'Andante moderato';
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
}
const Tempo: React.FC = () => {
	const isSmallScreen = useMediaQuery('(max-width:430px)');
	const { state, dispatch } = useAppState();
	const tempo: number = state.tempo;

	const calcTapBoxWidth = (): string => {
		if (isSmallScreen) {
			return '100%';
		} else {
			return tempo < 200 ? '27vh' : '32vh';
		}
	};
	const handleChange = (e: Event, newValue: number | number[]): void => {
		dispatch({ type: actions.TEMPO, payload: newValue as number });
	};

	const arrowStyles = {
		width: isSmallScreen ? '8vh' : '9vh',
		height: isSmallScreen ? '8vh' : '9vh',
		textAlign: 'center',
	};

	const handleArrowClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_TEMPO });
		} else {
			dispatch({ type: actions.DECREASE_TEMPO });
		}
	};
	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="space-between"
			sx={{ height: '35%', width: '100%', backgroundColor: 'none' }}
		>
			<Box sx={{ height: '4%', width: '80vw', maxWidth: '300px', mb: '5px', zIndex: 3 }}>
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
			<Stack
				alignItems="center"
				alignContent="center"
				sx={{ width: '80%', backgroundColor: 'none' }}
			>
				<Stack
					direction="row"
					alignItems="center"
					alignContent="center"
					spacing="none"
					sx={{
						mt: '0px',
						height: '100%',
						width: '50%',
						backgroundColor: 'none',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Tooltip title="-Tempo (L Arrow)">
						<IconButton onClick={() => handleArrowClick(false)} sx={arrowContainerStyles}>
							<ArrowBackIosIcon
								sx={{ ...arrowStyles, position: 'relative', left: '1.5vh' }}
							/>
						</IconButton>
					</Tooltip>
					<Box sx={{ height: 'fit-content', minWidth: '2vh', width: calcTapBoxWidth() }}>
						<TapTempo />
					</Box>
					<Tooltip title="+Tempo (R Arrow)">
						<IconButton onClick={() => handleArrowClick(true)} sx={arrowContainerStyles}>
							<ArrowForwardIosIcon sx={arrowStyles} />
						</IconButton>
					</Tooltip>
				</Stack>
			</Stack>
			<Typography sx={{ mt: '10px', fontSize: '300%' }} variant="h3">
				{getTempoMarking(tempo)}
			</Typography>
		</Stack>
	);
};

export default Tempo;
