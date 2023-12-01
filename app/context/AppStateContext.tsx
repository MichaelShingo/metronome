import React, { createContext, useReducer, useContext, Dispatch } from 'react';
// import { controlDroneOsc } from './DroneAudio';

export const audioContext = new AudioContext();

const droneOsc = audioContext.createOscillator();
const droneGain = audioContext.createGain();
const droneFilter = audioContext.createBiquadFilter();
const out = audioContext.destination;
const droneStarted = false;
droneOsc.connect(droneGain);
droneGain.connect(droneFilter);
droneGain.gain.value = 1;
droneFilter.connect(out);

export const MAX_TEMPO = 250;
export const MIN_TEMPO = 20;
export const MAX_BEATS = 21;
export const MIN_BEATS = 1;

interface GlobalState {
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
}
const initialState: GlobalState = {
	metro_on: false,
	drone_on: false,
	drone_pitch: '9',
	drone_octave: '4',
	freq: 400,
	dark_mode: true,
	tempo: 60,
	settings_open: false,
	beats: 4,
	current_beat: 1,
};

type AppAction = { type: string; payload?: string | number };

interface AppStateContextType {
	state: GlobalState;
	dispatch: Dispatch<AppAction>;
}

export const actions: Record<string, string> = {
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
};

const incStr = (numericString: string, increment: boolean): string => {
	if (increment) {
		return (parseInt(numericString) + 1).toString();
	}
	return (parseInt(numericString) - 1).toString();
};
// Create a reducer function
const appReducer = (state: GlobalState, action: AppAction): GlobalState => {
	switch (action.type) {
		case actions.METRO_ON:
			// osc1.start();
			return { ...state, metro_on: !state.metro_on };
		case actions.DRONE_ON:
			if (state.drone_on) {
				droneGain.gain.value = 0;
			} else {
				try {
					droneOsc.start();
				} catch {
					droneGain.gain.value = 1;
				}
			}
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
		case actions.INCREASE_BEATS:
			if (state.beats === MAX_BEATS) {
				return state;
			}
			return { ...state, beats: state.beats + 1 };
		case actions.DECREASE_BEATS:
			if (state.beats === MIN_BEATS) {
				return state;
			}
			return { ...state, beats: state.beats - 1 };
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
		default:
			return state;
	}
};

// Create a context for the state

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Step 4: Create a provider component

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

// Create a custom hook for using the context
export const useAppState = (): AppStateContextType => {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider');
	}
	return context;
};

export default AppStateProvider;
