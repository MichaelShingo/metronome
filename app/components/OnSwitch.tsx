import { Switch } from '@mui/material';
import { useAppState } from '../context/AppStateContext';

const OnSwitch: React.FC = () => {
	const { state, dispatch } = useAppState();
	const on: boolean = state.on;
	const handleToggle = (): void => {
		dispatch({ type: 'ON' });
	};

	return <Switch checked={on} onChange={handleToggle} defaultChecked />;
};

export default OnSwitch;
