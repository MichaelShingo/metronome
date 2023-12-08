import { RecursivePartial } from 'tone/build/esm/core/util/Interface';
import * as Tone from 'tone';

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

const AudioSamples = () => {
	return <></>;
};

export default AudioSamples;
