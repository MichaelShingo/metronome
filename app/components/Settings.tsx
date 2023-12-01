import SettingsIcon from '@mui/icons-material/Settings';
import {
	IconButton,
	Modal,
	Typography,
	Box,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';
import DroneSettings from './DroneSettings';
import React from 'react';
import { iconStyles } from './Drone';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { actions, useAppState } from '../context/AppStateContext';

const modalStyle = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const Settings: React.FC = () => {
	const { state, dispatch } = useAppState();
	const darkMode: boolean = state.dark_mode;
	const open: boolean = state.settings_open;
	const handleSettingsToggle = () => dispatch({ type: actions.SETTINGS_OPEN });
	const handleModeToggle = () => {
		dispatch({ type: actions.DARK_MODE });
	};

	return (
		<>
			<Tooltip title="Settings (S)">
				<IconButton
					onClick={handleSettingsToggle}
					sx={{ w: '150px', h: '150px', color: 'grey.300', p: '15px' }}
				>
					<SettingsIcon sx={iconStyles} />
				</IconButton>
			</Tooltip>

			<Modal
				open={open}
				onClose={handleSettingsToggle}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography variant="h4">Settings</Typography>
					<Select fullWidth>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
					</Select>
					<DroneSettings />
					<IconButton onClick={handleModeToggle}>
						{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Box>
			</Modal>
		</>
	);
};

export default Settings;
