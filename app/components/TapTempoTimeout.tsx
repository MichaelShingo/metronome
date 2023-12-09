import { useEffect } from 'react';
import { MIN_TEMPO, actions, useAppState } from '../context/AppStateContext';
const TapTempoTimeout = () => {
	const { state, dispatch } = useAppState();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch({ type: actions.RESET_TAPS });
		}, MIN_TEMPO * 600);

		return () => clearTimeout(timeoutId);
	}, [state.tapped]);
	return <></>;
};

export default TapTempoTimeout;
