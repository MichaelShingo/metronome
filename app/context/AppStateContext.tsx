import React, { createContext, useReducer, useContext, Dispatch } from 'react';

export const MAX_TEMPO = 300;
export const MIN_TEMPO = 10;
export const MAX_BEATS = 21;
export const MIN_BEATS = 1;
export const MAX_BEATS_POLY = 15;
export const BEAT_PITCH_MAX = 3;
export const BEAT_PITCH_MIN = 0;
export const H_BREAKPOINT = 440;
export const SETTINGS_ROW_SPACING: string = '10px';

export type SoundType = 'Tap' | 'Low Beep' | 'Ring' | 'Beep' | 'Hihat' | 'Silent';
export const SOUND_TYPE: Record<string, SoundType> = {
	TAP: 'Tap',
	BEEP: 'Beep',
	LOW_BEEP: 'Low Beep',
	RING: 'Ring',
	HIHAT: 'Hihat',
	SILENT: 'Silent',
};

export type Subdivision =
	| 'None'
	| 'Eighths'
	| 'Sixteenths'
	| 'Triplets'
	| 'Swung'
	| 'Dotted'
	| 'Quintuplets'
	| 'Syncopated';
export const SUBDIVISION: Record<string, Subdivision> = {
	NONE: 'None',
	EIGHTHS: 'Eighths',
	TRIPLETS: 'Triplets',
	SWUNG: 'Swung',
	SIXTEENTHS: 'Sixteenths',
	DOTTED: 'Dotted',
	QUINTUPLETS: 'Quintuplets',
};

interface GlobalState {
	tempo_dialog: boolean;
	window_height: number;
	window_width: number;
	metro_on: boolean;
	drone_on: boolean;
	drone_pitch: string;
	drone_octave: string;
	freq: number;
	dark_mode: boolean;
	tempo: number;
	settings_open: boolean;
	beats: number;
	current_beat: number;
	sound_type: SoundType;
	beat_map: Record<number, number>;
	flash: boolean;
	flash_change: boolean;
	metro_gain: number;
	subdivision_gain: number;
	drone_gain: number;
	tap_times: Date[] | [];
	tapped: boolean;
	subdivision: Subdivision;
	polyrhythm: string;
	current_beat_poly: number;
	sound_type_poly: string;
	poly_gain: number;
	beat_map_poly: Record<number, number>;
}
const initialState: GlobalState = {
	tempo_dialog: false,
	window_height: 1000,
	window_width: 1000,
	metro_on: false,
	drone_on: false,
	drone_pitch: '9',
	drone_octave: '4',
	freq: 400,
	dark_mode: true,
	tempo: 60,
	settings_open: false,
	beats: 4,
	current_beat: -1,
	sound_type: SOUND_TYPE.TAP,
	beat_map: {
		0: 3,
		1: 1,
		2: 1,
		3: 1,
	},
	flash: false,
	flash_change: false,
	metro_gain: 100,
	subdivision_gain: 100,
	drone_gain: 100,
	tap_times: [],
	tapped: false,
	subdivision: SUBDIVISION.NONE,
	polyrhythm: '0',
	current_beat_poly: -1,
	sound_type_poly: SOUND_TYPE.BEEP,
	poly_gain: 100,
	beat_map_poly: {
		0: 3,
		1: 1,
		2: 1,
		3: 1,
	},
};

export type AppAction = { type: string; payload?: string | number };

interface AppStateContextType {
	state: GlobalState;
	dispatch: Dispatch<AppAction>;
}

export const actions: Record<string, string> = {
	TOGGLE_TEMPO_DIALOG: 'TOGGLE_TEMPO_DIALOG',
	SET_WIN_WIDTH: 'SET_WIN_WIDTH',
	SET_WIN_HEIGHT: 'SET_WIN_HEIGHT',
	METRO_ON: 'METRO_ON',
	DRONE_ON: 'DRONE_ON',
	DRONE_PITCH: 'DRONE_PITCH',
	DRONE_OCTAVE: 'DRONE_OCTAVE',
	DARK_MODE: 'DARK_MODE',
	TEMPO: 'TEMPO',
	INCREASE_TEMPO: 'INCREASE_TEMPO',
	DECREASE_TEMPO: 'DECREASE_TEMPO',
	INCREASE_PITCH: 'INCREASE_PITCH',
	DECREASE_PITCH: 'DECREASE_PITCH',
	INCREASE_OCTAVE: 'INCREASE_OCTAVE',
	DECREASE_OCTAVE: 'DECREASE_OCTAVE',
	SETTINGS_OPEN: 'SETTINGS_OPEN',
	INCREASE_BEATS: 'INCREASE_BEATS',
	DECREASE_BEATS: 'DECREASE_BEATS',
	CURRENT_BEAT: 'CURRENT_BEAT',
	SOUND_TYPE: 'SOUND_TYPE',
	BEAT_MAP: 'BEAT_MAP',
	TOGGLE_FLASH: 'TOGGLE_FLASH',
	FLASH_CHANGE: 'FLASH_CHANGE',
	METRO_GAIN: 'METRO_GAIN',
	SUBDIVISION_GAIN: 'SUBDIVISION_GAIN',
	DRONE_GAIN: 'DRONE_GAIN',
	RESET_TAPS: 'RESET_TAPS',
	DETECT_TAP: 'DETECT_TAP',
	SUBDIVISION: 'SUBDIVISION',
	POLYRHYTHM: 'POLYRHYTHM',
	INCREASE_POLY_BEAT: 'INCREASE_POLY_BEAT',
	DECREASE_POLY_BEAT: 'DECREASE_POLY_BEAT',
	CURRENT_BEAT_POLY: 'CURRENT_BEAT_POLY',
	BEAT_MAP_POLY: 'BEAT_MAP_POLY',
	SOUND_TYPE_POLY: 'SOUND_TYPE_POLY',
	POLY_GAIN: 'POLY_GAIN',
};

const incStr = (numericString: string, increment: boolean): string => {
	if (increment) {
		return (parseInt(numericString) + 1).toString();
	}
	return (parseInt(numericString) - 1).toString();
};

const generatePolyBeatMap = (
	numOfBeats: number,
	curMap: Record<number, number>
): Record<number, number> => {
	let res: Record<number, number> = { ...curMap };
	const curLen: number = Object.keys(curMap).length;
	if (numOfBeats === curLen) {
		return curMap;
	} else if (numOfBeats > curLen) {
		res = { ...curMap };
		for (let i = curLen; i < numOfBeats; i++) {
			res[i] = i === 0 ? 3 : 1;
		}
		return res;
	} else {
		for (let i = curLen; i > numOfBeats; i--) {
			delete res[i];
		}
	}
	return res;
};

const createBeatMap = (
	beatMap: Record<number, number>,
	key: number
): Record<number, number> => {
	const newBeatMap = beatMap;
	const currentValue = newBeatMap[key];
	if (currentValue >= BEAT_PITCH_MAX) {
		newBeatMap[key] = 0;
	} else {
		newBeatMap[key]++;
	}
	return newBeatMap;
};

const appReducer = (state: GlobalState, action: AppAction): GlobalState => {
	switch (action.type) {
		case actions.TOGGLE_TEMPO_DIALOG:
			return { ...state, tempo_dialog: !state.tempo_dialog };
		case actions.SET_WIN_HEIGHT:
			return { ...state, window_height: action.payload as number };
		case actions.SET_WIN_WIDTH:
			return { ...state, window_width: action.payload as number };
		case actions.METRO_ON:
			if (state.metro_on) {
				return {
					...state,
					current_beat: -1,
					current_beat_poly: -1,
					metro_on: !state.metro_on,
				};
			} else {
				return { ...state, metro_on: !state.metro_on };
			}
		case actions.TOGGLE_FLASH:
			return { ...state, flash: !state.flash };
		case actions.DRONE_ON:
			return {
				...state,
				drone_on: !state.drone_on,
			};
		case actions.DRONE_PITCH:
			return { ...state, drone_pitch: action.payload as string };
		case actions.DRONE_OCTAVE:
			return { ...state, drone_octave: action.payload as string };
		case actions.DARK_MODE:
			return { ...state, dark_mode: !state.dark_mode };
		case actions.TEMPO:
			return { ...state, tempo: action.payload as number };
		case actions.INCREASE_TEMPO:
			if (state.tempo === MAX_TEMPO) {
				return state;
			}
			return { ...state, tempo: state.tempo + 1 };
		case actions.DECREASE_TEMPO:
			if (state.tempo === MIN_TEMPO) {
				return state;
			}
			return { ...state, tempo: state.tempo - 1 };
		case actions.INCREASE_BEATS: {
			if (state.beats === MAX_BEATS) {
				return state;
			}
			const newBeatMap = state.beat_map;
			newBeatMap[state.beats] = 1;

			return {
				...state,
				beats: state.beats + 1,
				beat_map: newBeatMap,
			};
		}
		case actions.DECREASE_BEATS: {
			if (state.beats === MIN_BEATS) {
				return state;
			}
			const newBeatMap = state.beat_map;
			delete newBeatMap[state.beats - 1];
			return { ...state, beats: state.beats - 1, beat_map: newBeatMap };
		}
		case actions.BEAT_MAP: {
			const newBeatMap = createBeatMap(state.beat_map, action.payload as number);
			return { ...state, beat_map: newBeatMap };
		}
		case actions.INCREASE_PITCH:
			if (state.drone_pitch === '11') {
				if (parseInt(state.drone_octave) < 7) {
					return {
						...state,
						drone_pitch: '0',
						drone_octave: incStr(state.drone_octave, true),
					};
				}
				return state;
			}
			return { ...state, drone_pitch: incStr(state.drone_pitch, true) };
		case actions.DECREASE_PITCH:
			if (state.drone_pitch === '0') {
				if (parseInt(state.drone_octave) > 1) {
					return {
						...state,
						drone_pitch: '11',
						drone_octave: incStr(state.drone_octave, false),
					};
				}
				return state;
			}
			return { ...state, drone_pitch: incStr(state.drone_pitch, false) };
		case actions.INCREASE_OCTAVE:
			if (state.drone_octave !== '7') {
				return { ...state, drone_octave: incStr(state.drone_octave, true) };
			}
			return state;
		case actions.DECREASE_OCTAVE:
			if (state.drone_octave !== '1') {
				return { ...state, drone_octave: incStr(state.drone_octave, false) };
			}
			return state;
		case actions.SETTINGS_OPEN:
			return { ...state, settings_open: !state.settings_open };
		case actions.CURRENT_BEAT:
			return {
				...state,
				current_beat: action.payload as number,
				flash_change: !state.flash_change,
			};
		case actions.SOUND_TYPE:
			return { ...state, sound_type: action.payload as SoundType };
		case actions.DRONE_GAIN:
			return { ...state, drone_gain: action.payload as number };
		case actions.METRO_GAIN:
			return { ...state, metro_gain: action.payload as number };
		case actions.SUBDIVISION_GAIN:
			return { ...state, subdivision_gain: action.payload as number };
		case actions.POLY_GAIN:
			return { ...state, poly_gain: action.payload as number };
		case actions.RESET_TAPS:
			return { ...state, tap_times: [] };
		case actions.DETECT_TAP:
			return { ...state, tapped: !state.tapped };
		case actions.SUBDIVISION:
			return { ...state, subdivision: action.payload as Subdivision };
		case actions.POLYRHYTHM: {
			const value: number = action.payload as number;
			let res: string;
			if (value < 0) {
				res = '0';
			} else if (value > MAX_BEATS_POLY) {
				res = MAX_BEATS_POLY.toString();
			} else {
				res = value.toString();
			}
			return {
				...state,
				beat_map_poly: generatePolyBeatMap(action.payload as number, state.beat_map_poly),
				polyrhythm: res,
			};
		}
		case actions.CURRENT_BEAT_POLY:
			return { ...state, current_beat_poly: action.payload as number };
		case actions.SOUND_TYPE_POLY:
			return { ...state, sound_type_poly: action.payload as SoundType };
		case actions.BEAT_MAP_POLY: {
			const newBeatMap = createBeatMap(state.beat_map_poly, action.payload as number);
			return { ...state, beat_map_poly: newBeatMap };
		}
		default:
			return state;
	}
};

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

interface Props {
	children: React.ReactNode;
}

const AppStateProvider: React.FC<Props> = ({ children }) => {
	// useReducer returns the current state and a dispatch function
	const [state, dispatch] = useReducer(appReducer, initialState);

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = (): AppStateContextType => {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider');
	}
	return context;
};

export default AppStateProvider;
