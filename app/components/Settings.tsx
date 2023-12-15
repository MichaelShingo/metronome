import SettingsIcon from '@mui/icons-material/Settings';
import {
	IconButton,
	Typography,
	Box,
	Tooltip,
	Stack,
	Dialog,
	DialogProps,
	DialogContent,
	DialogTitle,
	Slide,
} from '@mui/material';
import DroneSettings from './DroneSettings';
import React from 'react';
import { iconStyles } from './Drone';
import CloseIcon from '@mui/icons-material/Close';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import LightModeIcon from '@mui/icons-material/LightMode';
import { H_BREAKPOINT, actions, useAppState } from '../context/AppStateContext';
import MetroSettings from './MetroSettings';
import { TransitionProps } from '@mui/material/transitions';

export const SELECT_MARGIN = '10px';

const Settings: React.FC = () => {
	const { state, dispatch } = useAppState();
	const [scroll] = React.useState<DialogProps['scroll']>('paper');

	// const darkMode: boolean = state.dark_mode;
	const open: boolean = state.settings_open;
	const handleSettingsToggle = () => dispatch({ type: actions.SETTINGS_OPEN });
	// const handleModeToggle = () => {
	// 	dispatch({ type: actions.DARK_MODE });
	// };

	return (
		<Box sx={{ width: 'fit-content', height: '100%' }}>
			<Tooltip title="Settings (S)" placement="left">
				<IconButton
					onClick={handleSettingsToggle}
					sx={{
						width: 'fit-content',
						height: '100%',
						color: 'grey.300',
						padding: state.window_height < H_BREAKPOINT ? '0px' : '10px',
					}}
				>
					<SettingsIcon sx={iconStyles} />
				</IconButton>
			</Tooltip>

			<Dialog
				open={open}
				keepMounted
				onClose={handleSettingsToggle}
				scroll={scroll}
				maxWidth="xs"
				fullWidth={true}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{ paper: 'primary.dark' }}
			>
				<DialogTitle sx={{ backgroundColor: 'background.default' }}>
					<Stack direction="row" justifyContent="space-between">
						<Typography variant="h4">Settings</Typography>
						<IconButton
							size="small"
							onClick={handleSettingsToggle}
							sx={{ width: '10%', height: '10%' }}
						>
							<CloseIcon sx={{ width: '100%', height: '100%' }} />
						</IconButton>
					</Stack>
				</DialogTitle>
				<DialogContent sx={{ backgroundColor: 'background.default' }}>
					<MetroSettings />
					<DroneSettings />
					{/* <IconButton onClick={handleModeToggle}>
							{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
						</IconButton> */}
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default Settings;
