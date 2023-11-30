import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { actions, useAppState } from '../context/AppStateContext';

const iconStyles = {
	width: 225,
	height: 225,
};

const StartButton: React.FC = () => {
	const { state, dispatch } = useAppState();
	const on: boolean = state.metro_on;

	const handleClick = () => {
		dispatch({ type: actions.METRO_ON });
	};
	return (
		<>
			<IconButton
				color="primary"
				size="large"
				sx={{ width: 'fit-content', height: 'fit-content' }}
				onClick={handleClick}
			>
				{on ? <PauseCircleIcon sx={iconStyles} /> : <PlayCircleIcon sx={iconStyles} />}
			</IconButton>
		</>
	);
};

export default StartButton;
