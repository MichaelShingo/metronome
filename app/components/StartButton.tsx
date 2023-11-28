import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const StartButton: React.FC = () => {
	const playing: boolean = false;
	return (
		<>
			<IconButton color="primary" size="large">
				{playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
			</IconButton>
		</>
	);
};

export default StartButton;
