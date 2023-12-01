import { useEffect } from 'react';
import { actions, useAppState } from '../context/AppStateContext';

const KeyPressHandler: React.FC = () => {
	const { dispatch } = useAppState();

	const handleKeyPress = (event: KeyboardEvent): void => {
		if (event.key === 'd') {
			dispatch({ type: actions.DRONE_ON });
		} else if (event.shiftKey && event.key === 'ArrowUp') {
			dispatch({ type: actions.INCREASE_OCTAVE });
		} else if (event.shiftKey && event.key === 'ArrowDown') {
			dispatch({ type: actions.DECREASE_OCTAVE });
		} else if (event.key === 'ArrowRight') {
			dispatch({ type: actions.INCREASE_TEMPO });
		} else if (event.key === 'ArrowLeft') {
			dispatch({ type: actions.DECREASE_TEMPO });
		} else if (event.key === 'p') {
			dispatch({ type: actions.METRO_ON });
		} else if (event.key === 'ArrowUp') {
			dispatch({ type: actions.INCREASE_PITCH });
		} else if (event.key === 'ArrowDown') {
			dispatch({ type: actions.DECREASE_PITCH });
		} else if (event.key === 's') {
			dispatch({ type: actions.SETTINGS_OPEN });
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
	return <></>;
};

export default KeyPressHandler;
