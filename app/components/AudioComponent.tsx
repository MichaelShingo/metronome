import React, { useEffect } from 'react';
import {
	actions,
	useAppState,
	SOUND_TYPE,
	SUBDIVISION,
	Subdivision,
} from '../context/AppStateContext';
import * as Tone from 'tone';
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
type SynthType =
	| Tone.MonoSynth
	| Tone.MembraneSynth
	| Tone.NoiseSynth
	| Tone.Synth
	| Tone.PolySynth;

let synth: SynthType = new Tone.MembraneSynth();
let synthSub: SynthType = new Tone.MembraneSynth();
limiter.toDestination();
synth.connect(limiter);
synthSub.connect(limiter);
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

const defaultSound: string = 'tap2';
const samplePlayer: Tone.Player = new Tone.Player({
	url: `/${defaultSound}.mp3`,
}).toDestination();
const samplePlayerSub: Tone.Player = new Tone.Player({
	url: `/${defaultSound}.mp3`,
}).toDestination();

const samplePlayerTest = new Tone.Player();
const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();
	const recordedSample: boolean = recordedSamples.has(state.sound_type);
	const mappedVolume: number = mapRange(state.metro_gain, 0, 100, -90, 0);

	const startMetronome = () => {
		Tone.start();
		const getCurrentBeat = (): number => {
			return parseInt(Tone.Transport.position.toString().split(':')[1]);
		};
		const getSubbeat = (): number => {
			const subbeat = parseInt(Tone.Transport.position.toString().split(':')[2]);
			return subbeat;
		};
		const calcNoteDuration = (subdivision: Subdivision): string => {
			switch (subdivision) {
				case SUBDIVISION.EIGHTHS:
					return '8';
				case SUBDIVISION.SIXTEENTHS:
					return '16';
				case SUBDIVISION.TRIPLETS:
					return '12';
				case SUBDIVISION.QUINTUPLETS:
					return '20';
				default:
					return '0';
			}
		};

		const startLoop = (pitchOffset: number) => {
			const loop = new Tone.Loop((time: number) => {
				const beat = getCurrentBeat();
				const beatAccent = state.beat_map[beat];
				if (recordedSamples.has(state.sound_type)) {
					samplePlayer.buffer = buffers.get(
						`${state.sound_type.toLowerCase() + beatAccent}`
					);
					samplePlayer.start(time);
				} else if (state.sound_type !== SOUND_TYPE.SILENT) {
					synth.triggerAttackRelease(`D${beatAccent + pitchOffset}`, 0.1, time);
				}
				dispatch({ type: actions.CURRENT_BEAT, payload: beat });
			}, '4n');
			loop.start();
			console.log(calcNoteDuration(state.subdivision));

			if (state.subdivision !== SUBDIVISION.NONE) {
				const subdivisionLoop = new Tone.Loop(
					(time: number): void => {
						const subbeat = getSubbeat();
						console.log(Tone.Transport.position, subbeat);
						if (subbeat > 0) {
							if (recordedSamples.has(state.sound_type)) {
								samplePlayerSub.buffer = buffers.get(
									`${state.sound_type.toLowerCase() + '0'}`
								);
								samplePlayerSub.start(time);
							} else if (state.sound_type !== SOUND_TYPE.SILENT) {
								synthSub.triggerAttackRelease(`D${0 + pitchOffset}`, 0.1, time);
							}
						}
					},
					`${calcNoteDuration(state.subdivision)}n`
				);
				subdivisionLoop.start();
			}
		};

		if (recordedSamples.has(state.sound_type)) {
			startLoop(1);
		} else {
			switch (state.sound_type) {
				case SOUND_TYPE.BEEP:
					synth = new Tone.Synth(beepSynthSettings).toDestination();
					synthSub = new Tone.Synth(beepSynthSettings).toDestination();
					synth.volume.value = mappedVolume;
					synthSub.volume.value = mappedVolume;
					startLoop(4);
					break;
				case SOUND_TYPE.LOW_BEEP:
					synth = new Tone.Synth(lowBeepSynthSettings).toDestination();
					synthSub = new Tone.Synth(lowBeepSynthSettings).toDestination();
					synth.volume.value = mappedVolume;
					synthSub.volume.value = mappedVolume;
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
			startMetronome();
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
			startMetronome();
		}
	}, [state.sound_type, state.beat_map, state.subdivision]);

	// metro volume
	useEffect(() => {
		synth.volume.value = mappedVolume;
		samplePlayer.volume.value = mappedVolume;
		samplePlayerTest.volume.value = mappedVolume;
	}, [state.metro_gain]);

	// tempo
	useEffect(() => {
		Tone.Transport.bpm.value = state.tempo;
	}, [state.tempo]);

	// num of beats
	useEffect(() => {
		Tone.Transport.timeSignature = state.beats;
	}, [state.beats]);

	useEffect(() => {
		samplePlayer.buffer = recordedSample
			? buffers.get(`${state.sound_type.toLowerCase()}0`)
			: buffers.get(defaultSound);
	}, [state.sound_type]);

	return <></>;
};

export default AudioComponent;
