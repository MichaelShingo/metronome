// import { audioContext } from './AppStateContext';

// const droneOsc = audioContext.createOscillator();
// const droneGain = audioContext.createGain();
// const droneFilter = audioContext.createBiquadFilter();
// const out = audioContext.destination;
//
// export const controlDroneOsc = (action: string): void => {
// 	switch (action) {
// 		case 'start':
// 			droneOsc.connect(droneGain);
// 			droneGain.connect(droneFilter);
// 			droneGain.gain.value = 1;
// 			droneFilter.connect(out);
// 			break;
// 		case 'stop':
// 			droneGain.gain.value = 0;
// 			break;

// 		default:
// 			console.log('No match for action.');
// 			break;
// 	}
// };
