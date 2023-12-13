import Beats from './Beats';
import { actions, useAppState } from '../context/AppStateContext';
import { Stack, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const BeatsContainer: React.FC = () => {
	const theme = useTheme();
	const { state, dispatch } = useAppState();
	const handleClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_BEATS });
		} else {
			dispatch({ type: actions.DECREASE_BEATS });
		}
	};
	return (
		<>
			<Stack direction="row" sx={{ mb: '-20px' }}>
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
			<Beats
				beats={state.beats}
				currentBeat={state.current_beat}
				beatMap={state.beat_map}
				beatMapAction={actions.BEAT_MAP}
				colorDefault={theme.palette.grey[300]}
				colorActive={theme.palette.primary.light}
			/>
			<Beats
				beats={parseInt(state.polyrhythm)}
				currentBeat={state.current_beat_poly}
				beatMap={state.beat_map_poly}
				beatMapAction={actions.BEAT_MAP_POLY}
				colorDefault={theme.palette.error.dark}
				colorActive={theme.palette.error.light}
			/>
		</>
	);
};

export default BeatsContainer;
