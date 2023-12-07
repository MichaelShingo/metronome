import React, { Dispatch, useEffect } from 'react';
import { actions, useAppState, SoundType, SOUND_TYPE } from '../context/AppStateContext';
import * as Tone from 'tone';
import { AppAction } from '../context/AppStateContext';

function mapRange(
	value: number,
	fromMin: number,
	fromMax: number,
	toMin: number,
	toMax: number
): number {
	const clampedValue = Math.min(Math.max(value, fromMin), fromMax);
	const mappedValue =
		((clampedValue - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;

	return mappedValue;
}

const droneOsc = new Tone.Oscillator({
	frequency: 440,
	type: 'sine',
}).toDestination();

const highpassFilter = new Tone.Filter({
	type: 'highpass',
	frequency: 500,
}).toDestination();

const limiter = new Tone.Limiter(-10);

const samplePlayer: Tone.Player = new Tone.Player({
	url: '/hihat.mp3',
}).toDestination();
let synth:
	| Tone.MonoSynth
	| Tone.MembraneSynth
	| Tone.NoiseSynth
	| Tone.Synth
	| Tone.PolySynth = new Tone.MembraneSynth();

limiter.toDestination();
synth.connect(limiter);
droneOsc.connect(limiter);

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
	Tone.start();
	const getCurrentBeat = (): number => {
		return parseInt(Tone.Transport.position.toString().split(':')[1]);
	};

	const startLoop = (pitchOffset: number) => {
		const loop = new Tone.Loop((time: number) => {
			const beat = getCurrentBeat();
			const beatAccent = beatMap[beat];
			if (soundType === SOUND_TYPE.WOODBLOCK) {
				// highpassFilter.frequency.value = (beatAccent + 1) * 1000;
				synth.triggerAttackRelease(0.5, time, (beatAccent + 1) * 2);
			} else if (soundType === SOUND_TYPE.HIHAT) {
				samplePlayer.start(time);
			} else {
				highpassFilter.disconnect();
				synth.triggerAttackRelease(`D${beatAccent + pitchOffset}`, 0.1, time);
			}
			dispatch({ type: actions.CURRENT_BEAT, payload: beat });
		}, '4n');
		loop.start();
	};

	switch (soundType) {
		case SOUND_TYPE.LOW_TAP:
			synth = new Tone.MembraneSynth().toDestination();
			synth.volume.value = -20;
			synth.envelope.attack = 0.001;
			startLoop(1);
			break;
		case SOUND_TYPE.BEEP:
			synth = new Tone.Synth({
				oscillator: {
					type: 'triangle',
				},
				envelope: {
					attack: 0.001,
					decay: 0.05,
					sustain: 0.1,
					release: 0.1,
				},
			}).toDestination();
			startLoop(4);
			break;
		case SOUND_TYPE.CLICK:
			synth = new Tone.Synth({
				oscillator: {
					type: 'sine',
				},
				envelope: {
					attack: 0.001,
					decay: 0.05,
					sustain: 0.9,
					release: 0.5,
				},
			}).toDestination();
			startLoop(3);
			break;
		case SOUND_TYPE.HIHAT:
			startLoop(3);
			break;
		case SOUND_TYPE.WOODBLOCK:
			synth = new Tone.NoiseSynth({
				noise: {
					type: 'white',
					playbackRate: 1,
				},
				envelope: {
					attack: 0.001,
					decay: 0.05,
					sustain: 0,
					release: 0.1,
				},
			}).toDestination();
			synth.connect(highpassFilter);
			startLoop(1);
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

const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();

	// drone toggle
	useEffect(() => {
		if (state.drone_on) {
			droneOsc.start();
		} else {
			droneOsc.stop();
		}
	}, [state.drone_on]);

	// drone volume
	useEffect(() => {
		droneOsc.volume.value = mapRange(state.drone_gain, 0, 100, -90, -20);
	}, [state.drone_gain]);

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

	// change metro sound
	useEffect(() => {
		if (state.metro_on) {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
			startMetronome(state.sound_type, state.beat_map, dispatch);
		}
	}, [state.sound_type, state.beat_map]);

	// metro volume
	useEffect(() => {
		synth.volume.value = mapRange(state.metro_gain, 0, 100, -90, 0);
	}, [state.metro_gain]);

	// tempo
	useEffect(() => {
		adjustTempo(state.tempo);
	}, [state.tempo]);

	// num of beats
	useEffect(() => {
		adjustBeats(state.beats);
	}, [state.beats]);

	// resume audio context to prevent lag
	useEffect(() => {
		// Fix for The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.
		// even if it says it's running, there is a delay
		const resumeAudioContext = () => {
			Tone.start();
			// console.log(Tone.context);
			// console.log(Tone.context.state);
			if (Tone.context.state !== 'running') {
				// console.log('resuming audio context');
				Tone.context.resume();
			}
		};
		resumeAudioContext();
		const intervalId = setInterval(resumeAudioContext, 5000);
		return () => clearInterval(intervalId);
	});
	return <></>;
};

export default AudioComponent;
