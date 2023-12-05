import { MenuItem, Select, SelectChangeEvent, Switch, Typography } from '@mui/material';
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

	const handleFlashToggle = () => {
		dispatch({ type: actions.TOGGLE_FLASH });
	};

	const handleSoundTypeChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.SOUND_TYPE, payload: e.target.value });
	};
	return (
		<>
			<Typography variant="h5">Metronome</Typography>
			<Typography variant="subtitle1">Sound Sample</Typography>
			<Select value={state.sound_type} onChange={handleSoundTypeChange} fullWidth>
				{generateSoundTypes()}
			</Select>
			<Typography variant="subtitle1">Flash On Beat</Typography>
			<Switch checked={flash} onChange={handleFlashToggle} />
		</>
	);
};

export default MetroSettings;
