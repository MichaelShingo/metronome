import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Modal, Typography, Box } from '@mui/material';
import { useState } from 'react';

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
			<IconButton onClick={handleOpen}>
				<SettingsIcon />
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h4">Settings</Typography>
				</Box>
			</Modal>
		</>
	);
};

export default Settings;
