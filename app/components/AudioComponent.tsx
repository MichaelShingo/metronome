import { Dispatch, useEffect } from 'react';
import { actions, useAppState, SoundType, SOUND_TYPE } from '../context/AppStateContext';
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

const startMetronome = (
	soundType: SoundType,
	beatMap: Record<number, number>,
	dispatch: Dispatch<AppAction>
) => {
	let synth: Tone.MonoSynth | Tone.MembraneSynth;

	const getCurrentBeat = (): number => {
		return parseInt(Tone.Transport.position.toString().split(':')[1]);
	};

	switch (soundType) {
		case SOUND_TYPE.LOW_TAP:
			synth = new Tone.MembraneSynth().toDestination();
			// const filter = new Tone.Filter(500, 'lowpass').toDestination();
			synth.envelope.attack = 0.001;
			// synth.connect(filter);
			// const distortion = new Tone.Distortion(0.5).toDestination();
			// synth.connect(distortion);
			new Tone.Loop((time: number) => {
				const beat = getCurrentBeat();
				const beatAccent = beatMap[beat];

				synth.triggerAttackRelease(`D${beatAccent}`, '.05', time);

				dispatch({ type: actions.CURRENT_BEAT, payload: beat });
			}, '4n').start(0);
			break;
		case SOUND_TYPE.BEEP:
			synth = new Tone.MonoSynth().toDestination();
			new Tone.Loop((time: number) => {
				const beat = getCurrentBeat();
				if (beat === 0) {
					synth.triggerAttackRelease('D8', '.01', time);
				} else {
					synth.triggerAttackRelease('D7', '.01', time);
				}
				dispatch({ type: actions.CURRENT_BEAT, payload: beat });
			}, '4n').start(0);
			break;
		default:
			new Tone.Loop(() => {
				const beat = getCurrentBeat();
				dispatch({ type: actions.CURRENT_BEAT, payload: beat });
			}, '4n').start(0);
	}

	Tone.Transport.start();
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
			startMetronome(state.sound_type, state.beat_map, dispatch);
		} else {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
		}
	}, [state.metro_on, dispatch]);

	useEffect(() => {
		if (state.metro_on) {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
			startMetronome(state.sound_type, state.beat_map, dispatch);
		}
	}, [state.sound_type, state.beat_map]);

	useEffect(() => {
		adjustTempo(state.tempo);
	}, [state.tempo]);

	useEffect(() => {
		adjustBeats(state.beats);
	}, [state.beats]);
	return <></>;
};

export default AudioComponent;
