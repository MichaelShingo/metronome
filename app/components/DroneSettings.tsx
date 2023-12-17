import { SETTINGS_ROW_SPACING, actions, useAppState } from '../context/AppStateContext';
import {
	Stack,
	MenuItem,
	Typography,
	Select,
	SelectChangeEvent,
	Tooltip,
} from '@mui/material';
import GainSlider from './GainSlider';
import { SELECT_MARGIN } from './Settings';
import { Box } from '@mui/system';

const generateOctaves = (): React.JSX.Element[] => {
	const res: React.JSX.Element[] = [];
	for (let i = 1; i < 8; i++) {
		res.push(
			<MenuItem key={i} value={i}>
				{i}
			</MenuItem>
		);
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
		res.push(
			<MenuItem key={i} value={i}>
				{pitchList[i]}
			</MenuItem>
		);
	}
	return res;
};

const DroneSettings = () => {
	const { state, dispatch } = useAppState();
	const pitch: string = state.drone_pitch;
	const octave: string = state.drone_octave;
	const gain: number = state.drone_gain;

	const handlePitchChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.DRONE_PITCH, payload: e.target.value });
	};

	const handleOctaveChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.DRONE_OCTAVE, payload: e.target.value });
	};

	const handleGainChange = (e: Event, newValue: number | number[]) => {
		dispatch({ type: actions.DRONE_GAIN, payload: newValue as number });
	};

	return (
		<>
			<Typography variant="h5">Drone</Typography>
			<Stack
				direction="row"
				spacing={SETTINGS_ROW_SPACING}
				sx={{ width: '100%', marginBottom: SELECT_MARGIN }}
			>
				<Box id="drone-pitch-box" sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Pitch</Typography>

					<Tooltip title="Pitch (Up/Down Arrow)" placement="left">
						<Select
							value={pitch}
							sx={{ width: '50%' }}
							onChange={handlePitchChange}
							fullWidth
						>
							{generatePitches()}
						</Select>
					</Tooltip>
					<Tooltip title="Octave (Shift + Up/Down Arrow)" placement="right">
						<Select
							sx={{ width: '50%' }}
							value={octave}
							onChange={handleOctaveChange}
							fullWidth
						>
							{generateOctaves()}
						</Select>
					</Tooltip>
				</Box>
				<GainSlider title="Volume" gain={gain} handleGainChange={handleGainChange} />
			</Stack>
		</>
	);
};

export default DroneSettings;
