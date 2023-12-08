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

const adjustTempo = (tempo: number) => {
	Tone.Transport.bpm.value = tempo;
};

const adjustBeats = (beats: number) => {
	Tone.Transport.timeSignature = beats;
};

const recordedSamples: Set<string> = new Set([
	SOUND_TYPE.TAP,
	SOUND_TYPE.HIHAT,
	SOUND_TYPE.RING,
]);

const AudioComponent: React.FC = () => {
	const { state, dispatch } = useAppState();
	const recordedSample: boolean = recordedSamples.has(state.sound_type);
	const defaultSound: string = '/tap2.mp3';
	const samplePlayer0: Tone.Player = new Tone.Player({
		url: recordedSample ? `/${state.sound_type.toLowerCase()}0.mp3` : defaultSound,
	}).toDestination();
	const samplePlayer1: Tone.Player = new Tone.Player({
		url: recordedSample ? `/${state.sound_type.toLowerCase()}1.mp3` : defaultSound,
	}).toDestination();
	const samplePlayer2: Tone.Player = new Tone.Player({
		url: recordedSample ? `/${state.sound_type.toLowerCase()}2.mp3` : defaultSound,
	}).toDestination();
	const samplePlayer3: Tone.Player = new Tone.Player({
		url: recordedSample ? `/${state.sound_type.toLowerCase()}3.mp3` : defaultSound,
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
				if (soundType === SOUND_TYPE.SILENT) {
					console.log('silent');
				} else if (recordedSamples.has(soundType)) {
					switch (beatAccent) {
						case 0:
							samplePlayer0.start(time);
							break;
						case 1:
							samplePlayer1.start(time);
							break;
						case 2:
							samplePlayer2.start(time);
							break;
						case 3:
							samplePlayer3.start(time);
							break;
					}
				} else {
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
				case SOUND_TYPE.HIHAT:
					startLoop(3);
					break;
				case SOUND_TYPE.WOODBLOCK:
					startLoop(1);
					break;
				default:
					startLoop;
					new Tone.Loop(() => {
						const beat = getCurrentBeat();
						dispatch({ type: actions.CURRENT_BEAT, payload: beat });
					}, '4n').start(0);
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
		samplePlayer0.volume.value = mappedVolume;
		samplePlayer1.volume.value = mappedVolume;
		samplePlayer2.volume.value = mappedVolume;
		samplePlayer3.volume.value = mappedVolume;
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
	// useEffect(() => {
	// 	// Fix for The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.
	// 	// even if it says it's running, there is a delay
	// 	const resumeAudioContext = () => {
	// 		Tone.start();
	// 		// console.log(Tone.context);
	// 		// console.log(Tone.context.state);
	// 		if (Tone.context.state !== 'running') {
	// 			// console.log('resuming audio context');
	// 			Tone.context.resume();
	// 		}
	// 	};
	// 	resumeAudioContext();
	// 	const intervalId = setInterval(resumeAudioContext, 5000);
	// 	return () => clearInterval(intervalId);
	// });
	return <></>;
};

export default AudioComponent;
