// // import { audioContext } from './AppStateContext';

// export const audioContext = new AudioContext();

// // DRONE FUNCTIONS
// const droneOsc = audioContext.createOscillator();
// const droneGain = audioContext.createGain();
// const droneFilter = audioContext.createBiquadFilter();
// const out = audioContext.destination;
// droneOsc.connect(droneGain);
// droneGain.connect(droneFilter);
// droneGain.gain.value = 1;
// droneFilter.connect(out);

// export const startDrone = () => {
// 	try {
// 		droneOsc.start();
// 	} catch {
// 		droneGain.gain.value = 1;
// 	}
// };

// export const stopDrone = () => {
// 	droneGain.gain.value = 0;
// };

// export const changeDronePitch = (pitch: string, octave: string) => {
// 	droneOsc.frequency.value = parseInt(pitch) * 100;
// };

// // METRONOME FUNCTIONS
