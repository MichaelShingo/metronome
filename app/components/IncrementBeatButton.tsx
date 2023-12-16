import { IconButton, Tooltip } from '@mui/material';
import { H_BREAKPOINT, useAppState } from '../context/AppStateContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

interface ButtonProps {
	handleClick: (event: React.MouseEvent) => void;
	tooltipTitle: string;
	tooltipPlacement: 'top' | 'bottom';
	plus: boolean;
}

const iconButtonStyles = {
	width: 'fit-content',
	minWidth: '20px',
	minHeight: '20px',
	height: 'fit-content',
	maxHeight: '90%',
	padding: '5px',
};

const IncrementBeatButton: React.FC<ButtonProps> = ({
	handleClick,
	tooltipTitle,
	tooltipPlacement,
	plus,
}) => {
	const { state } = useAppState();
	const iconStyles = {
		maxWidth: '30px',
		minWidth: '20px',
		minHeight: '20px',
		width: state.window_height < H_BREAKPOINT ? '4vh' : '100%',
		height: state.window_height < H_BREAKPOINT ? '4vh' : '100%',
	};
	return (
		<Tooltip title={tooltipTitle} placement={tooltipPlacement}>
			<IconButton sx={iconButtonStyles} size="large" onClick={handleClick}>
				{plus ? (
					<AddCircleIcon sx={iconStyles}></AddCircleIcon>
				) : (
					<RemoveCircleIcon sx={iconStyles} />
				)}
			</IconButton>
		</Tooltip>
	);
};

export default IncrementBeatButton;
