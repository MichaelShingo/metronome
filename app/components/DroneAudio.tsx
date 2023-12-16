import { useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import * as Tone from 'tone';
import { mapRange } from './AudioResources';

export const continuousOsc: Tone.Oscillator = new Tone.Oscillator({
	frequency: 0,
	type: 'sine',
	volume: -500,
}).toDestination();

export const droneOsc: Tone.Oscillator = new Tone.Oscillator({
	frequency: 440,
	type: 'sine',
}).toDestination();

const changeDronePitch = (pitch: string, octave: string) => {
	const BASE_FREQ = 440; // A4
	const a = Math.pow(2, 1 / 12);
	const semitoneDist: number = parseInt(pitch) - 9 + (parseInt(octave) - 4) * 12;
	const frequency = BASE_FREQ * Math.pow(a, semitoneDist);
	droneOsc.frequency.value = frequency;
};

const DroneAudio = () => {
	const { state } = useAppState();

	// toggle
	useEffect(() => {
		if (state.drone_on) {
			droneOsc.start();
		} else {
			droneOsc.stop();
		}
	}, [state.drone_on]);

	// volume
	useEffect(() => {
		droneOsc.volume.value = mapRange(state.drone_gain, 0, 100, -90, -20);
	}, [state.drone_gain]);

	// pitch
	useEffect(() => {
		changeDronePitch(state.drone_pitch, state.drone_octave);
	}, [state.drone_pitch, state.drone_octave]);

	return <></>;
};

export default DroneAudio;
