import React from 'react';
import { Stack, Slider, Box } from '@mui/material';
import { RemoveCircle, AddCircle } from '@mui/icons-material';
const Osc1 = () => {
	return (
		<div>
			<Box sx={{ width: 200 }}>
				<Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
					<RemoveCircle />
					<Slider min={0} max={5000} valueLabelDisplay="auto" aria-label="Frequency" />
					<AddCircle />
				</Stack>
			</Box>
		</div>
	);
};

export default Osc1;
