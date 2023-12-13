import {
	Box,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import React from 'react';
import {
	actions,
	useAppState,
	SOUND_TYPE,
	SUBDIVISION,
} from '../context/AppStateContext';
import GainSlider from './GainSlider';

const generateMenuItems = (items: Record<string, string>): JSX.Element[] => {
	const res: JSX.Element[] = [];
	for (const item of Object.values(items)) {
		res.push(
			<MenuItem key={item} value={item}>
				{item}
			</MenuItem>
		);
	}
	return res;
};

const generatePolyrhythmMenu = (): JSX.Element[] => {
	const res: JSX.Element[] = [];
	for (let i = 0; i <= 9; i++) {
		res.push(
			<MenuItem key={i} value={i.toString()}>
				{i === 0 ? 'None' : i.toString()}
			</MenuItem>
		);
	}
	return res;
};
const MetroSettings: React.FC = () => {
	const { state, dispatch } = useAppState();
	const flash: boolean = state.flash;
	const gain: number = state.metro_gain;

	const handleFlashToggle = () => {
		dispatch({ type: actions.TOGGLE_FLASH });
	};

	const handleSoundTypeChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.SOUND_TYPE, payload: e.target.value });
	};

	const handleSubdivisionChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.SUBDIVISION, payload: e.target.value });
	};

	const handleGainChange = (e: Event, newValue: number | number[]) => {
		dispatch({ type: actions.METRO_GAIN, payload: newValue as number });
	};

	const handleSubGainChange = (e: Event, newValue: number | number[]) => {
		dispatch({ type: actions.SUBDIVISION_GAIN, payload: newValue as number });
	};

	const handlePolyrhythmChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.POLYRHYTHM, payload: e.target.value });
	};

	return (
		<>
			<Typography variant="h5">Metronome</Typography>
			<Stack spacing="5px" direction="row" sx={{ width: '100%' }}>
				<Box sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Sound Sample</Typography>
					<Select value={state.sound_type} onChange={handleSoundTypeChange} fullWidth>
						{generateMenuItems(SOUND_TYPE)}
					</Select>
				</Box>
				<Box sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Subdivision</Typography>
					<Select value={state.subdivision} onChange={handleSubdivisionChange} fullWidth>
						{generateMenuItems(SUBDIVISION)}
					</Select>
				</Box>
			</Stack>
			<Stack direction="row" sx={{ width: '100%' }}>
				<GainSlider
					title="Main Beat Volume"
					gain={gain}
					handleGainChange={handleGainChange}
				/>
				<GainSlider
					title="Subdivision Volume"
					gain={state.subdivision_gain}
					handleGainChange={handleSubGainChange}
				/>
			</Stack>
			<Stack direction="row" sx={{ width: '100%' }}>
				<Stack direction="column" sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Polyrhythm</Typography>
					<Select
						value={state.polyrhythm.toString()}
						onChange={handlePolyrhythmChange}
						fullWidth
					>
						{generatePolyrhythmMenu()}
					</Select>
				</Stack>
			</Stack>
			<Stack direction="column" sx={{ width: '50%' }}>
				<Typography variant="subtitle1">Flash on Beat</Typography>
				<Switch checked={flash} onChange={handleFlashToggle} />
			</Stack>
		</>
	);
};

export default MetroSettings;
