import React, { Dispatch, useEffect } from 'react';
import { actions, useAppState, SoundType, SOUND_TYPE } from '../context/AppStateContext';
import * as Tone from 'tone';
import { AppAction } from '../context/AppStateContext';
import { beepSynthSettings, lowBeepSynthSettings } from './AudioSamples';
import { droneOsc } from './DroneAudio';

export function mapRange(
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

const recordedSamples: Set<string> = new Set([
	SOUND_TYPE.TAP,
	SOUND_TYPE.HIHAT,
	SOUND_TYPE.RING,
]);

const limiter = new Tone.Limiter(-10);
let synth:
	| Tone.MonoSynth
	| Tone.MembraneSynth
	| Tone.NoiseSynth
	| Tone.Synth
	| Tone.PolySynth = new Tone.MembraneSynth();
limiter.toDestination();
synth.connect(limiter);
droneOsc.connect(limiter);

const urls: Record<string, string> = {
	tap0: '/tap0.mp3',
	tap1: '/tap1.mp3',
	tap2: '/tap2.mp3',
	tap3: '/tap3.mp3',
	ring0: '/ring0.mp3',
	ring1: '/ring1.mp3',
	ring2: '/ring2.mp3',
	ring3: '/ring3.mp3',
	hihat0: '/hihat0.mp3',
	hihat1: '/hihat1.mp3',
	hihat2: '/hihat2.mp3',
	hihat3: '/hihat3.mp3',
};
const buffers: Tone.ToneAudioBuffers = new Tone.Buffers(urls);

const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();
	const recordedSample: boolean = recordedSamples.has(state.sound_type);
	const defaultSound: string = 'tap2';
	const samplePlayer: Tone.Player = new Tone.Player({
		url: recordedSample
			? buffers.get(`${state.sound_type.toLowerCase()}0`)
			: buffers.get(defaultSound),
	}).toDestination();

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
				if (recordedSamples.has(soundType)) {
					samplePlayer.buffer = buffers.get(
						`${state.sound_type.toLowerCase() + beatAccent}`
					);
					samplePlayer.start(time);
				} else if (soundType !== SOUND_TYPE.SILENT) {
					synth.triggerAttackRelease(`D${beatAccent + pitchOffset}`, 0.1, time);
				}
				dispatch({ type: actions.CURRENT_BEAT, payload: beat });
			}, '4n');
			loop.start();
		};

		if (recordedSamples.has(soundType)) {
			startLoop(1);
		} else {
			switch (soundType) {
				case SOUND_TYPE.BEEP:
					synth = new Tone.Synth(beepSynthSettings).toDestination();
					startLoop(4);
					break;
				case SOUND_TYPE.LOW_BEEP:
					synth = new Tone.Synth(lowBeepSynthSettings).toDestination();
					startLoop(3);
					break;
				default:
					startLoop(0);
					break;
			}
		}
		Tone.Transport.start();
	};

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
		const mappedVolume: number = mapRange(state.metro_gain, 0, 100, -90, 0);
		synth.volume.value = mappedVolume;
	}, [state.metro_gain]);

	// tempo
	useEffect(() => {
		Tone.Transport.bpm.value = state.tempo;
	}, [state.tempo]);

	// num of beats
	useEffect(() => {
		Tone.Transport.timeSignature = state.beats;
	}, [state.beats]);

	return <></>;
};

export default AudioComponent;
