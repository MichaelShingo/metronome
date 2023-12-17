import React, { useEffect } from 'react';
import * as Tone from 'tone';
import { continuousOsc, droneOsc } from './DroneAudio';
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
let limiter;
let synth: SynthType;
let synthSub: SynthType;
let synthPoly: SynthType;
let buffers: Tone.ToneAudioBuffers;
let samplePlayer: Tone.Player;
let samplePlayerSub: Tone.Player;
let samplePlayerPoly: Tone.Player;

const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();
	const recordedSample: boolean = recordedSamples.has(state.sound_type);
	const recordedSamplePoly: boolean = recordedSamples.has(state.sound_type_poly);
	const mappedVolume: number = mapRange(state.metro_gain, 0, 100, -90, 0);
	const mappedVolumeSub: number = mapRange(state.subdivision_gain, 0, 100, -90, 0);
	const mappedVolumePoly: number = mapRange(state.poly_gain, 0, 100, -90, 0);

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
				let beat = 0;
				const polyrhythmLoop = new Tone.Loop((time): void => {
					const beatAccent = state.beat_map_poly[beat];
					if (recordedSamples.has(state.sound_type_poly)) {
						samplePlayerPoly.buffer = buffers.get(
							`${state.sound_type_poly.toLowerCase() + beatAccent}`
						);
						samplePlayerPoly.start(time);
					} else if (state.sound_type_poly !== SOUND_TYPE.SILENT) {
						state.sound_type_poly === SOUND_TYPE.BEEP
							? synthPoly.triggerAttackRelease(`D${beatAccent + 3}`, 0.1, time)
							: synthPoly.triggerAttackRelease(`D${beatAccent + 1}`, 0.1, time);
					}
					dispatch({ type: actions.CURRENT_BEAT_POLY, payload: beat });
					if (beat === parseInt(state.polyrhythm) - 1) {
						beat = 0;
					} else {
						beat++;
					}
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
					synthPoly.volume.value = mappedVolumePoly;
					startLoop(4);
					break;
				case SOUND_TYPE.LOW_BEEP:
					synth = new Tone.Synth(lowBeepSynthSettings).toDestination();
					synthSub = new Tone.Synth(lowBeepSynthSettings).toDestination();
					synth.volume.value = mappedVolume;
					synthSub.volume.value = mappedVolume;
					synthPoly.volume.value = mappedVolumePoly;
					startLoop(3);
					break;
				default:
					startLoop(0);
					break;
			}
		}
		Tone.Transport.start();
	};

	// instantiate and connect audio components
	useEffect(() => {
		buffers = new Tone.Buffers(bufferUrls);
		limiter = new Tone.Limiter(-10).toDestination();
		synth = new Tone.MembraneSynth().connect(limiter);
		synthSub = new Tone.MembraneSynth().connect(limiter);
		synthPoly = new Tone.Synth(beepSynthSettings).connect(limiter);
		samplePlayer = new Tone.Player({
			url: `/${defaultSound}.mp3`,
		}).toDestination();
		samplePlayerSub = new Tone.Player({
			url: `/${defaultSound}.mp3`,
		}).toDestination();
		samplePlayerPoly = new Tone.Player({
			url: `/${defaultSound}.mp3`,
		}).toDestination();
		droneOsc && droneOsc.connect(limiter);
	}, []);
	// toggle metronome
	useEffect(() => {
		if (continuousOsc && continuousOsc.state === 'stopped') {
			continuousOsc.start();
		}
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
		state.sound_type_poly,
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

	// polyrhythm volume
	useEffect(() => {
		synthPoly.volume.value = mappedVolumePoly;
		samplePlayerPoly.volume.value = mappedVolumePoly;
	}, [state.poly_gain]);

	// tempo
	useEffect(() => {
		Tone.Transport.bpm.value = state.tempo;
	}, [state.tempo]);

	// sound type
	useEffect(() => {
		samplePlayer.buffer =
			buffers && recordedSample
				? buffers.get(`${state.sound_type.toLowerCase()}0`)
				: buffers.get(defaultSound);
	}, [state.sound_type]);

	// sound type polyrhythm
	useEffect(() => {
		samplePlayerPoly.buffer =
			buffers && recordedSamplePoly
				? buffers.get(`${state.sound_type_poly.toLowerCase()}0`)
				: buffers.get(defaultSound);
	}, [state.sound_type_poly]);

	return <></>;
};

export default AudioComponent;
