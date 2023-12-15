import { IconButton, Tooltip } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { H_BREAKPOINT, actions, useAppState } from '../context/AppStateContext';
import { Box } from '@mui/system';

export const iconStyles: Record<string, string | number> = {
	width: '100%',
	height: '100%',
};

const Drone: React.FC = () => {
	const { state, dispatch } = useAppState();
	const on: boolean = state.drone_on;
	const handleClick = () => {
		dispatch({ type: actions.DRONE_ON });
	};
	return (
		<Box sx={{ width: 'fit-content', height: '100%' }}>
			<Tooltip title="Toggle Drone (D)" placement="right">
				<IconButton
					onClick={handleClick}
					sx={{
						width: 'fit-content',
						height: '100%',
						padding: state.window_height < H_BREAKPOINT ? '0px' : '10px',
					}}
				>
					<GraphicEqIcon
						sx={{
							...iconStyles,
							color: on ? 'primary.light' : 'grey.300',
						}}
					/>
				</IconButton>
			</Tooltip>
		</Box>
	);
};

export default Drone;
