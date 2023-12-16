import {
	Box,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import {
	actions,
	useAppState,
	SOUND_TYPE,
	SUBDIVISION,
	MAX_BEATS_POLY,
} from '../context/AppStateContext';
import GainSlider from './GainSlider';
import { SELECT_MARGIN } from './Settings';

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
	for (let i = 0; i <= MAX_BEATS_POLY; i++) {
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

	const handlePolySoundTypeChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.SOUND_TYPE_POLY, payload: e.target.value });
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

	const handlePolyGainChange = (e: Event, newValue: number | number[]) => {
		dispatch({ type: actions.POLY_GAIN, payload: newValue as number });
	};

	const handlePolyrhythmChange = (e: SelectChangeEvent) => {
		dispatch({ type: actions.POLYRHYTHM, payload: e.target.value });
	};

	return (
		<>
			<Typography variant="h5">Main Beat</Typography>
			<Stack
				spacing="5px"
				direction="row"
				sx={{ width: '100%', marginBottom: SELECT_MARGIN }}
			>
				<Box sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Sample</Typography>
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
			<Typography variant="h6">Polyrhythm</Typography>

			<Stack
				spacing="5px"
				direction="row"
				sx={{ width: '100%', marginBottom: SELECT_MARGIN }}
			>
				<Stack direction="column" sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Beats</Typography>
					<Tooltip title=" (Ctrl + Up/Down Arrow)" placement="left">
						<Select
							value={state.polyrhythm.toString()}
							onChange={handlePolyrhythmChange}
							fullWidth
						>
							{generatePolyrhythmMenu()}
						</Select>
					</Tooltip>
				</Stack>
				<Box sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Sample</Typography>
					<Select
						value={state.sound_type_poly}
						onChange={handlePolySoundTypeChange}
						fullWidth
					>
						{generateMenuItems(SOUND_TYPE)}
					</Select>
				</Box>
			</Stack>
			<Stack direction="row" sx={{ width: '100%' }}>
				<GainSlider
					title="Volume"
					gain={state.poly_gain}
					handleGainChange={handlePolyGainChange}
				/>
				<Stack direction="column" sx={{ width: '50%' }}>
					<Typography variant="subtitle1">Flash on Beat</Typography>
					<Tooltip title="Toggle Flash (F)" placement="right">
						<Switch checked={flash} onChange={handleFlashToggle} />
					</Tooltip>
				</Stack>
			</Stack>
		</>
	);
};

export default MetroSettings;
