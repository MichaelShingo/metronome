import Beats from './Beats';
import { actions, useAppState } from '../context/AppStateContext';
import { Stack, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { getTempoMarking } from './Tempo';
import TempoSelectDialog from './TempoSelectDialog';
import { Box } from '@mui/system';
import IncrementBeatButton from './IncrementBeatButton';

export const beatsContainerMaxWidth: number = 420;

const BeatsContainer: React.FC = () => {
	const theme = useTheme();
	const { state, dispatch } = useAppState();

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
			id="beat-container"
			direction="column"
			sx={{
				backgroundColor: 'none',
				width: '100%',
				height: state.polyrhythm !== '0' ? '25%' : '15%',
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
				<IncrementBeatButton
					handleClick={() => handleClick(false)}
					tooltipPlacement="top"
					tooltipTitle="-Beat (Shift + L Arrow)"
					plus={false}
				/>
				<Button
					onClick={toggleTempoDialog}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'fit-content',
						color: 'common.white',
						bottom: '10px',
						'&:hover': {
							color: 'primary.light',
						},
					}}
				>
					<Typography
						id="tempo-text"
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
				<IncrementBeatButton
					handleClick={() => handleClick(true)}
					tooltipPlacement="top"
					tooltipTitle="+Beat (Shift + R Arrow)"
					plus={true}
				/>
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
				<>
					<Beats
						beats={parseInt(state.polyrhythm)}
						currentBeat={state.current_beat_poly}
						beatMap={state.beat_map_poly}
						beatMapAction={actions.BEAT_MAP_POLY}
						colorDefault={theme.palette.common.darkBlue}
						colorActive={theme.palette.common.mediumLight}
					/>
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
						<IncrementBeatButton
							handleClick={() =>
								dispatch({
									type: actions.POLYRHYTHM,
									payload: parseInt(state.polyrhythm) - 1,
								})
							}
							tooltipPlacement="bottom"
							tooltipTitle="-Beat (Ctrl + Down Arrow)"
							plus={false}
						/>
						<Box
							sx={{
								height: 'fit-content',
							}}
						></Box>
						<IncrementBeatButton
							handleClick={() =>
								dispatch({
									type: actions.POLYRHYTHM,
									payload: parseInt(state.polyrhythm) + 1,
								})
							}
							tooltipPlacement="bottom"
							tooltipTitle="+Beat (Ctrl + Up Arrow)"
							plus={true}
						/>
					</Stack>
				</>
			) : (
				<></>
			)}
		</Stack>
	);
};

export default BeatsContainer;
