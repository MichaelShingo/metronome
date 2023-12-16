import { Chip, Grid } from '@mui/material';
import { actions, useAppState } from '../context/AppStateContext';
import React from 'react';
import { TEMPO_MAP } from './Tempo';

import DialogContainer from './DialogContainer';

const TempoSelectDialog = () => {
	const { state, dispatch } = useAppState();

	const handleChipClick = (tempoNum: number) => {
		dispatch({ type: actions.TEMPO, payload: tempoNum });
		dispatch({ type: actions.TOGGLE_TEMPO_DIALOG });
	};

	const handleTempoToggle = () => {
		dispatch({ type: actions.TOGGLE_TEMPO_DIALOG });
	};

	const generateChips = (): React.JSX.Element[] => {
		const res = [];
		for (const tempo of Object.keys(TEMPO_MAP)) {
			const tempoText = TEMPO_MAP[tempo][0];
			const tempoNum = TEMPO_MAP[tempo][1];
			res.push(
				<Grid item key={tempo}>
					<Chip
						label={`${tempoNum} ${tempoText}`}
						variant="outlined"
						color="primary"
						onClick={() => handleChipClick(tempoNum)}
						sx={{ fontSize: '1rem' }}
					/>
				</Grid>
			);
		}
		return res;
	};
	return (
		<DialogContainer
			title="Select a Tempo"
			open={state.tempo_dialog}
			handleToggle={handleTempoToggle}
		>
			<Grid container spacing={1}>
				{generateChips()}
			</Grid>
		</DialogContainer>
	);
};

export default TempoSelectDialog;
