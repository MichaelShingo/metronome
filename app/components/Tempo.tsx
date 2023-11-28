import { IconButton, Stack, Typography } from '@mui/material';
import { Slider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const Tempo: React.FC = () => {
	return (
		<>
			<Slider min={1} max={500} valueLabelDisplay="auto" aria-label="Frequency" />
			<Stack direction="row">
				<IconButton>
					<ArrowBackIosIcon />
				</IconButton>
				<Typography variant="h1">120</Typography>
				<IconButton>
					<ArrowForwardIosIcon />
				</IconButton>
			</Stack>
			<Typography variant="h3">Allegro</Typography>
		</>
	);
};

export default Tempo;
