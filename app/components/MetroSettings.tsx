import {
	MenuItem,
	Select,
	SelectChangeEvent,
	Slider,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import React from 'react';
import { actions, useAppState, SOUND_TYPE } from '../context/AppStateContext';

const generateSoundTypes = (): JSX.Element[] => {
	const res: JSX.Element[] = [];
	for (const soundType of Object.values(SOUND_TYPE)) {
		res.push(<MenuItem value={soundType}>{soundType}</MenuItem>);
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

	const handleGainChange = (e: Event, newValue: number | number[]) => {
		dispatch({ type: actions.METRO_GAIN, payload: newValue as number });
	};

	return (
		<>
			<Typography variant="h5">Metronome</Typography>
			<Typography variant="subtitle1">Sound Sample</Typography>
			<Select value={state.sound_type} onChange={handleSoundTypeChange} fullWidth>
				{generateSoundTypes()}
			</Select>
			<Stack direction="row" sx={{ width: '100%' }}>
				<Stack direction="column" sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Volume</Typography>
					<Slider
						sx={{ width: '85%', mt: '4px' }}
						min={0}
						max={100}
						valueLabelDisplay="auto"
						aria-label="Drone Gain"
						value={gain}
						onChange={handleGainChange}
						size="medium"
					/>
				</Stack>
				<Stack direction="column">
					<Typography variant="subtitle1">Flash on Beat</Typography>
					<Switch checked={flash} onChange={handleFlashToggle} />
				</Stack>
			</Stack>
		</>
	);
};

export default MetroSettings;
