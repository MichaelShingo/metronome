import { useEffect } from 'react';
import { actions, useAppState } from '../context/AppStateContext';
const TapTempoTimeout = () => {
	const { state, dispatch } = useAppState();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			dispatch({ type: actions.RESET_TAPS });
		}, 2500);

		return () => clearTimeout(timeoutId);
	}, [state.tapped]);
	return <></>;
};

export default TapTempoTimeout;
