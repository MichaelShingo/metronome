import Beats from './Beats';
import { H_BREAKPOINT, actions, useAppState } from '../context/AppStateContext';
import { Stack, Tooltip, IconButton, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { getTempoMarking } from './Tempo';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TempoSelectDialog from './TempoSelectDialog';

const iconButtonStyles = {
	width: 'fit-content',
	minWidth: '20px',
	minHeight: '20px',
	height: 'fit-content',
	maxHeight: '90%',
	padding: '5px',
};

export const beatsContainerMaxWidth: number = 420;

const BeatsContainer: React.FC = () => {
	const theme = useTheme();
	const { state, dispatch } = useAppState();

	const iconStyles = {
		maxWidth: '30px',
		minWidth: '20px',
		minHeight: '20px',
		width: state.window_height < H_BREAKPOINT ? '4vh' : '100%',
		height: state.window_height < H_BREAKPOINT ? '4vh' : '100%',
	};

	const calcFontSize = (): string => {
		if (state.window_height < 750) {
			return '5vh';
		}
		return state.window_width > beatsContainerMaxWidth ? '40px' : '8vw';
	};

	const handleClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_BEATS });
		} else {
			dispatch({ type: actions.DECREASE_BEATS });
		}
	};

	const toggleTempoDialog = () => {
		dispatch({ type: actions.TOGGLE_TEMPO_DIALOG });
	};

	return (
		<Stack
			direction="column"
			sx={{
				backgroundColor: 'none',
				width: '100%',
				height: state.polyrhythm !== '0' ? '20%' : '15%',
			}}
			alignItems="center"
			justifyContent="space-between"
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{
					mb: '0px',
					height: state.polyrhythm !== '0' ? '40%' : '60%',
					width: '95%',
					maxWidth: `${beatsContainerMaxWidth}px`,
					backgroundColor: 'none',
				}}
			>
				<Tooltip title="-Beat (Shift + L Arrow)" placement="top">
					<IconButton
						sx={iconButtonStyles}
						size="large"
						onClick={() => handleClick(false)}
					>
						<RemoveCircleIcon sx={iconStyles} />
					</IconButton>
				</Tooltip>
				<Button
					onClick={toggleTempoDialog}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'fit-content',
						color: 'common.white',
						'&:hover': {
							color: 'primary.light',
						},
					}}
				>
					<Typography
						sx={{
							fontSize: calcFontSize(),
							textAlign: 'center',
							textTransform: 'none',
						}}
						variant="h3"
					>
						{getTempoMarking(state.tempo)}
					</Typography>
				</Button>
				<TempoSelectDialog />
				<Tooltip title="+Beat (Shift + R Arrow)" placement="top">
					<IconButton
						sx={iconButtonStyles}
						size="large"
						onClick={() => handleClick(true)}
					>
						<AddCircleIcon sx={iconStyles} />
					</IconButton>
				</Tooltip>
			</Stack>
			<Beats
				beats={state.beats}
				currentBeat={state.current_beat}
				beatMap={state.beat_map}
				beatMapAction={actions.BEAT_MAP}
				colorDefault={theme.palette.grey[300]}
				colorActive={theme.palette.primary.light}
			/>

			{state.polyrhythm !== '0' ? (
				<Beats
					beats={parseInt(state.polyrhythm)}
					currentBeat={state.current_beat_poly}
					beatMap={state.beat_map_poly}
					beatMapAction={actions.BEAT_MAP_POLY}
					colorDefault={theme.palette.common.darkBlue}
					colorActive={theme.palette.common.mediumLight}
				/>
			) : (
				<></>
			)}
		</Stack>
	);
};

export default BeatsContainer;
