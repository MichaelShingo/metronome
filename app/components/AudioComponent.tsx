import React, { useEffect } from 'react';
import * as Tone from 'tone';
import { droneOsc } from './DroneAudio';
import {
	actions,
	useAppState,
	SOUND_TYPE,
	SUBDIVISION,
} from '../context/AppStateContext';
import {
	beepSynthSettings,
	lowBeepSynthSettings,
	mapRange,
	recordedSamples,
	SynthType,
	calcNoteDuration,
	bufferUrls,
} from './AudioResources';

const defaultSound: string = 'tap2';
const limiter = new Tone.Limiter(-10).toDestination();
let synth: SynthType = new Tone.MembraneSynth().connect(limiter);
let synthSub: SynthType = new Tone.MembraneSynth().connect(limiter);
const synthPoly: SynthType = new Tone.Synth(beepSynthSettings).connect(limiter);
const buffers: Tone.ToneAudioBuffers = new Tone.Buffers(bufferUrls);
const samplePlayer: Tone.Player = new Tone.Player({
	url: `/${defaultSound}.mp3`,
}).toDestination();
const samplePlayerSub: Tone.Player = new Tone.Player({
	url: `/${defaultSound}.mp3`,
}).toDestination();
droneOsc.connect(limiter);

const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();
	const recordedSample: boolean = recordedSamples.has(state.sound_type);
	const mappedVolume: number = mapRange(state.metro_gain, 0, 100, -90, 0);
	const mappedVolumeSub: number = mapRange(state.subdivision_gain, 0, 100, -90, 0);

	const calcPolyInterval = (): number => {
		const polyVal = parseInt(state.polyrhythm);
		const secondsPerBeat: number = 60 / state.tempo;
		return (secondsPerBeat * state.beats) / polyVal;
	};

	const startMetronome = async () => {
		await Tone.start();
		const getCurrentBeat = (): number => {
			return parseInt(Tone.Transport.position.toString().split(':')[1]);
		};
		const getSubbeat = (): number => {
			return parseFloat(Tone.Transport.position.toString().split(':')[2]);
		};

		const startLoop = (pitchOffset: number) => {
			const loop = new Tone.Loop((time) => {
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

			if (state.subdivision !== SUBDIVISION.NONE) {
				const subdivisionLoop = new Tone.Loop(
					(time): void => {
						const subbeat = getSubbeat();
						if (subbeat > 0.5) {
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
			if (state.polyrhythm !== '0') {
				const interval = calcPolyInterval();

				const polyrhythmLoop = new Tone.Loop((time): void => {
					synthPoly.triggerAttackRelease('D5', 0.1, time);
				}, interval);
				polyrhythmLoop.start();
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

	// change metro sound, time sig, subdivision, polyrhythm, beat accent
	useEffect(() => {
		Tone.Transport.timeSignature = state.beats;
		const subOn = state.subdivision !== SUBDIVISION.NONE;
		const polyOn = state.polyrhythm !== '0';
		const polyVal = parseInt(state.polyrhythm);
		const subVal = parseInt(calcNoteDuration(state.subdivision)) / 4;
		let ppq: number;
		if (subOn && polyOn) {
			ppq = subVal * polyVal;
		} else if (subOn && !polyOn) {
			ppq = subVal;
		} else if (!subOn && polyOn) {
			ppq = polyVal;
		} else {
			ppq = 1;
		}

		Tone.Transport.PPQ = ppq;
		if (state.subdivision === SUBDIVISION.SWUNG) {
			Tone.Transport.swing = 0.5;
			Tone.Transport.swingSubdivision = '8n';
		} else if (state.subdivision === SUBDIVISION.DOTTED) {
			Tone.Transport.swing = 0.75;
			Tone.Transport.swingSubdivision = '8n';
		} else {
			Tone.Transport.swing = 0;
		}
		if (state.metro_on) {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
			startMetronome();
		}
	}, [
		state.sound_type,
		state.beat_map,
		state.subdivision,
		state.polyrhythm,
		state.beats,
	]);

	// metro volume
	useEffect(() => {
		synth.volume.value = mappedVolume;
		samplePlayer.volume.value = mappedVolume;
	}, [state.metro_gain]);

	// subdivision volume
	useEffect(() => {
		synthSub.volume.value = mappedVolumeSub;
		samplePlayerSub.volume.value = mappedVolumeSub;
	}, [state.subdivision_gain]);

	// tempo
	useEffect(() => {
		Tone.Transport.bpm.value = state.tempo;
	}, [state.tempo]);

	// sound type
	useEffect(() => {
		samplePlayer.buffer = recordedSample
			? buffers.get(`${state.sound_type.toLowerCase()}0`)
			: buffers.get(defaultSound);
	}, [state.sound_type]);

	return <></>;
};

export default AudioComponent;
