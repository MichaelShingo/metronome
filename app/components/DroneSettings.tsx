import { actions, useAppState } from '../context/AppStateContext';
import {
	Stack,
	Switch,
	MenuItem,
	Typography,
	Select,
	SelectChangeEvent,
	Tooltip,
} from '@mui/material';

const generateOctaves = (): React.JSX.Element[] => {
	const res: React.JSX.Element[] = [];
	for (let i = 1; i < 8; i++) {
		res.push(<MenuItem value={i}>{i}</MenuItem>);
	}
	return res;
};

const generatePitches = (): React.JSX.Element[] => {
	const res: React.JSX.Element[] = [];
	const pitchList: string[] = [
		'C',
		'C#/Db',
		'D',
		'D#/Eb',
		'E',
		'F',
		'F#/Gb',
		'G',
		'G#/Ab',
		'A',
		'A#/Bb',
		'B',
	];
	for (let i: number = 0; i < pitchList.length; i++) {
		res.push(<MenuItem value={i}>{pitchList[i]}</MenuItem>);
	}
	return res;
};
const DroneSettings = () => {
	const { state, dispatch } = useAppState();
	const on: boolean = state.drone_on;
	const pitch: string = state.drone_pitch;
	const octave: string = state.drone_octave;

	const handleToggle = () => {
		dispatch({ type: actions.DRONE_ON });
	};

	const handlePitchChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.DRONE_PITCH, payload: e.target.value });
	};

	const handleOctaveChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.DRONE_OCTAVE, payload: e.target.value });
	};
	return (
		<>
			<Typography variant="h5">Drone</Typography>
			<Stack direction="row">
				<Tooltip title="Pitch (Up/Down Arrow Keys)">
					<Select value={pitch} onChange={handlePitchChange} fullWidth>
						{generatePitches()}
					</Select>
				</Tooltip>
				<Tooltip title="Octave (Shift + Up/Down Arrow Keys)">
					<Select value={octave} onChange={handleOctaveChange} fullWidth>
						{generateOctaves()}
					</Select>
				</Tooltip>
			</Stack>
			<Switch checked={on} onChange={handleToggle} />
		</>
	);
};

export default DroneSettings;
