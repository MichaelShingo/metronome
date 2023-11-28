import { IconButton } from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
const Drone: React.FC = () => {
	const handleClick = () => {
		console.log('set state');
	};
	return (
		<>
			<IconButton onClick={handleClick} size="large">
				<GraphicEqIcon />
			</IconButton>
		</>
	);
};

export default Drone;
