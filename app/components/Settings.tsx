import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Modal, Typography, Box, Tooltip, Stack } from '@mui/material';
import DroneSettings from './DroneSettings';
import React from 'react';
import { iconStyles } from './Drone';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { actions, useAppState } from '../context/AppStateContext';
import MetroSettings from './MetroSettings';

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
		<Box sx={{ width: 'fit-content', height: '100%' }}>
			<Tooltip title="Settings (S)" placement="left">
				<IconButton
					onClick={handleSettingsToggle}
					sx={{ width: 'fit-content', height: '100%', color: 'grey.300' }}
				>
					<SettingsIcon sx={iconStyles} />
				</IconButton>
			</Tooltip>

			<Modal
				open={open}
				onClose={handleSettingsToggle}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ position: 'absolute' }}
			>
				<Box sx={modalStyle}>
					<Stack direction="column" spacing="10px">
						<Typography variant="h4">Settings</Typography>
						<MetroSettings />
						<DroneSettings />
						<IconButton onClick={handleModeToggle}>
							{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton>
					</Stack>
				</Box>
			</Modal>
		</Box>
	);
};

export default Settings;
