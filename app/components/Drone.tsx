import { IconButton, Tooltip } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { actions, useAppState } from '../context/AppStateContext';

export const iconStyles: Record<string, string | number> = {
	width: '72px',
	height: '72px',
};

const Drone: React.FC = () => {
	const { state, dispatch } = useAppState();

	const on: boolean = state.drone_on;
	const handleClick = () => {
		dispatch({ type: actions.DRONE_ON });
	};
	return (
		<>
			<Tooltip title="Toggle Drone (D)">
				<IconButton onClick={handleClick} size="large" sx={{ w: '72px', h: '72px' }}>
					<GraphicEqIcon
						sx={{
							...iconStyles,
							width: '77px',
							color: on ? 'primary.light' : 'grey.300',
						}}
					/>
				</IconButton>
			</Tooltip>
		</>
	);
};

export default Drone;
