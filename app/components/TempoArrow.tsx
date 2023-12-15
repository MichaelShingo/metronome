import { Tooltip, Stack, IconButton } from '@mui/material';
import { H_BREAKPOINT, actions, useAppState } from '../context/AppStateContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const arrowStyles = {
	width: '100%',
	height: '100%',
};

interface TempoArrowProps {
	increment: boolean;
}

const TempoArrow: React.FC<TempoArrowProps> = ({ increment }) => {
	const { state, dispatch } = useAppState();

	const handleArrowClick = (increment: boolean) => {
		if (increment) {
			dispatch({ type: actions.INCREASE_TEMPO });
		} else {
			dispatch({ type: actions.DECREASE_TEMPO });
		}
	};
	return (
		<Tooltip title={increment ? '+Tempo (R Arrow)' : '-Tempo (L Arrow)'}>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{
					width: '10%',
					height: 'fit-content',
					paddingTop: '1%',
					backgroundColor: 'none',
				}}
			>
				<IconButton
					onClick={() => handleArrowClick(increment)}
					sx={{
						width: '45%',
						padding: '8px',
						height: '20%',
						minHeight: state.window_height < H_BREAKPOINT ? '45px' : '55px',
						minWidth: state.window_height < H_BREAKPOINT ? '45px' : '55px',
						backgroundColor: 'none',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{increment ? (
						<ArrowForwardIosIcon sx={arrowStyles} />
					) : (
						<ArrowBackIosIcon
							sx={{ ...arrowStyles, left: '15%', position: 'relative' }}
						/>
					)}
				</IconButton>
			</Stack>
		</Tooltip>
	);
};

export default TempoArrow;
