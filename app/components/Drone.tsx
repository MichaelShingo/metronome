import { IconButton, Tooltip } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

export const iconStyles: Record<string, string | number> = {
	width: 50,
	height: 50,
};

const Drone: React.FC = () => {
	const handleClick = () => {
		console.log('set state');
	};
	return (
		<>
			<Tooltip title="Toggle Drone">
				<IconButton
					onClick={handleClick}
					size="large"
					sx={{ w: 'fit-content', h: 'fit-content' }}
				>
					<GraphicEqIcon sx={iconStyles} />
				</IconButton>
			</Tooltip>
		</>
	);
};

export default Drone;
