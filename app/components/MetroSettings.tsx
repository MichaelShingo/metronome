import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import React from 'react';
import { actions, useAppState, SOUND_TYPE } from '../context/AppStateContext';

const MetroSettings: React.FC = () => {
	const { state, dispatch } = useAppState();

	const generateSoundTypes = (): JSX.Element[] => {
		const res: JSX.Element[] = [];
		for (const soundType of Object.values(SOUND_TYPE)) {
			res.push(<MenuItem value={soundType}>{soundType}</MenuItem>);
		}
		return res;
	};

	const handleSoundTypeChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.SOUND_TYPE, payload: e.target.value });
	};
	return (
		<>
			<Typography variant="h5">Metronome</Typography>
			<Select value={state.sound_type} onChange={handleSoundTypeChange} fullWidth>
				{generateSoundTypes()}
			</Select>
		</>
	);
};

export default MetroSettings;
