import { Box, Button, Stack, Tooltip } from '@mui/material';
import { useAppState } from '../context/AppStateContext';

interface BeatsProps {
	beats: number;
	currentBeat: number;
	beatMap: Record<number, number>;
	beatMapAction: string;
	colorDefault: string;
	colorActive: string;
}
const Beats: React.FC<BeatsProps> = ({
	beats,
	currentBeat,
	beatMap,
	beatMapAction,
	colorActive,
	colorDefault,
}) => {
	const { dispatch } = useAppState();

	const calculateBeatSize = (beatPitch: number): string => {
		switch (beatPitch) {
			case 0:
				return '10';
			case 1:
				return '40';
			case 2:
				return '70';
			case 3:
				return '100';
			default:
				return '100';
		}
	};

	const handleBeatClick = (beatNum: number) => {
		dispatch({ type: beatMapAction, payload: beatNum });
	};

	const displayBeats = (beats: number, currentBeat: number): JSX.Element[] => {
		const res = [];
		for (let i = 0; i < beats; i++) {
			res.push(
				<Tooltip key={i} title={`(${i + 1})`} placement="top">
					<Button
						key={i}
						onClick={() => handleBeatClick(i)}
						style={{
							minWidth: `${100 / beats}%`,
							width: `${100 / beats}%`,
							paddingLeft: i === 0 ? 0 : `${7 / beats}%`,
							paddingRight: i === beats - 1 ? 0 : `${7 / beats}%`,
							marginLeft: '0px',
							marginRight: '0px',
							marginBottom: '-15px',
							height: '6vh',
						}}
					>
						<Box
							sx={{
								width: '100%',
								height: calculateBeatSize(beatMap[i]) + '%',
								borderRadius: '4px',
								backgroundColor: i === currentBeat ? colorActive : colorDefault,
							}}
						></Box>
					</Button>
				</Tooltip>
			);
		}
		return res;
	};

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				sx={{
					backgroundColor: 'none',
					mt: '15px',
					width: '80%',
					maxWidth: '400px',
					transform: 'translate(0%)',
					ml: '50%',
					mr: '50%',
				}}
			>
				{displayBeats(beats, currentBeat)}
			</Stack>
		</>
	);
};

export default Beats;
