import { Stack } from '@mui/system';
import { useAppState } from '../context/AppStateContext';
import { beatsContainerMaxWidth } from './BeatsContainer';
import Settings from './Settings';
import Drone from './Drone';

const SettingsDroneRow = () => {
	const { state } = useAppState();
	return (
		<Stack
			data-label="settings-container"
			direction="row"
			spacing={state.window_width > beatsContainerMaxWidth ? '12%' : '25%'}
			alignItems="center"
			justifyContent="center"
			sx={{
				backgroundColor: 'none',
				width: '100%',
				height: '12%',
				overflowY: 'hidden',
				overflowX: 'hidden',
				paddingBottom: '0px',
			}}
		>
			<Settings />
			<Drone />
		</Stack>
	);
};

export default SettingsDroneRow;
