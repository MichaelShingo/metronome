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
import React, { useState } from 'react';
import { iconStyles } from './Drone';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '',
	boxShadow: 24,
	p: 4,
};

const Settings: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Tooltip title="Settings">
				<IconButton onClick={handleOpen} sx={{ w: '100px', h: '100px' }}>
					<SettingsIcon sx={iconStyles} />
				</IconButton>
			</Tooltip>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h4">Settings</Typography>
					<Select fullWidth>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
						<MenuItem>Sound 1</MenuItem>
					</Select>
					<DroneSettings />
				</Box>
			</Modal>
		</>
	);
};

export default Settings;
