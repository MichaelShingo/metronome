import { Dispatch, useEffect } from 'react';
import { actions, useAppState } from '../context/AppStateContext';
import * as Tone from 'tone';
import { AppAction } from '../context/AppStateContext';
const audioContext = new AudioContext();

// DRONE FUNCTIONS
const droneOsc = audioContext.createOscillator();
const droneGain = audioContext.createGain();
const droneFilter = audioContext.createBiquadFilter();
const out = audioContext.destination;
droneOsc.connect(droneGain);
droneGain.connect(droneFilter);
droneGain.gain.value = 1;
droneFilter.connect(out);

const changeDronePitch = (pitch: string, octave: string) => {
	const BASE_FREQ = 440; // A4
	const a = Math.pow(2, 1 / 12);
	const semitoneDist: number = parseInt(pitch) - 9 + (parseInt(octave) - 4) * 12;
	const frequency = BASE_FREQ * Math.pow(a, semitoneDist);
	droneOsc.frequency.value = frequency;
};

const startMetronome = (dispatch: Dispatch<AppAction>) => {
	const synth = new Tone.FMSynth().toDestination();
	// const index = Tone.Transport.position % Tone.Time('4n').toSeconds();

	const loop = new Tone.Loop((time: number) => {
		const index = 0;
		if (index === 0) {
			synth.triggerAttackRelease('D6', '.1', time);
		} else {
			synth.triggerAttackRelease('D5', '.1', time);
		}

		const beat = Tone.Transport.position.toString().split(':')[1];

		dispatch({ type: actions.CURRENT_BEAT, payload: beat });
	}, '4n').start(0);

	console.log(loop);
	Tone.Transport.start(); // set first tone accent // set bpm
};

const adjustTempo = (tempo: number) => {
	Tone.Transport.bpm.value = tempo;
};

const adjustBeats = (beats: number) => {
	Tone.Transport.timeSignature = beats;
};

// METRONOME FUNCTIONS
const AudioComponent = () => {
	const { state, dispatch } = useAppState();

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

	// toggle metronome
	useEffect(() => {
		if (state.metro_on) {
			startMetronome(dispatch);
		} else {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
		}
	}, [state.metro_on]);

	useEffect(() => {
		adjustTempo(state.tempo);
	}, [state.tempo]);

	useEffect(() => {
		adjustBeats(state.beats);
	}, [state.beats]);
	return <></>;
};

export default AudioComponent;
