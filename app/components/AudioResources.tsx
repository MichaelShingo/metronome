import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import * as Tone from 'tone';
import { SOUND_TYPE, Subdivision, SUBDIVISION } from '../context/AppStateContext';

// types and constants
export const recordedSamples: Set<string> = new Set([
	SOUND_TYPE.TAP,
	SOUND_TYPE.HIHAT,
	SOUND_TYPE.RING,
]);

export type SynthType =
	| Tone.MonoSynth
	| Tone.MembraneSynth
	| Tone.NoiseSynth
	| Tone.Synth
	| Tone.PolySynth;

// helper functions
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

export const calcNoteDuration = (subdivision: Subdivision): string => {
	switch (subdivision) {
		case SUBDIVISION.EIGHTHS:
		case SUBDIVISION.SWUNG:
		case SUBDIVISION.DOTTED:
			return '8';
		case SUBDIVISION.TRIPLETS:
			return '12';
		case SUBDIVISION.QUINTUPLETS:
			return '20';
		default:
			return '16';
	}
};

// sound samples
export const beepSynthSettings: RecursivePartial<Tone.SynthOptions> = {
	oscillator: {
		type: 'triangle',
	},
	envelope: {
		attack: 0.001,
		decay: 0.05,
		sustain: 0.1,
		release: 0.1,
	},
};

export const lowBeepSynthSettings: RecursivePartial<Tone.SynthOptions> = {
	oscillator: {
		type: 'sine',
	},
	envelope: {
		attack: 0.001,
		decay: 0.05,
		sustain: 0.9,
		release: 0.5,
	},
};

export const bufferUrls: Record<string, string> = {
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

// component
const AudioSamples: React.FC = () => {
	return <></>;
};

export default AudioSamples;
