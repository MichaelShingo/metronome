// import { audioContext } from './AppStateContext';

import { useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';

export const audioContext = new AudioContext();

// DRONE FUNCTIONS
const droneOsc = audioContext.createOscillator();
const droneGain = audioContext.createGain();
const droneFilter = audioContext.createBiquadFilter();
const out = audioContext.destination;
droneOsc.connect(droneGain);
droneGain.connect(droneFilter);
droneGain.gain.value = 1;
droneFilter.connect(out);

export const changeDronePitch = (pitch: string, octave: string) => {
	const BASE_FREQ = 440; // A4
	const a = Math.pow(2, 1 / 12);
	const semitoneDist: number = parseInt(pitch) - 9 + (parseInt(octave) - 4) * 12;
	const frequency = BASE_FREQ * Math.pow(a, semitoneDist);
	droneOsc.frequency.value = frequency;
};

// METRONOME FUNCTIONS
const AudioComponent = () => {
	const { state } = useAppState();

	// drone toggle
	useEffect(() => {
		if (state.drone_on) {
			try {
				droneOsc.start();
				droneGain.gain.value = 1;
			} catch {
				droneGain.gain.value = 1;
			}
		} else {
			droneGain.gain.value = 0;
		}
	}, [state.drone_on]);

	// drone pitch
	useEffect(() => {
		changeDronePitch(state.drone_pitch, state.drone_octave);
	}, [state.drone_pitch, state.drone_octave]);
	return <></>;
};

export default AudioComponent;
