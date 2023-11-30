import React, { createContext, useReducer, useContext, Dispatch } from 'react';

const actx = new AudioContext();
const out = actx.destination;
const osc1 = actx.createOscillator();
const gain1 = actx.createGain();
const filter = actx.createBiquadFilter();
osc1.connect(gain1);
gain1.connect(filter);
filter.connect(out);

interface GlobalState {
	metro_on: boolean;
	drone_on: boolean;
	drone_pitch: string;
	drone_octave: string;
	freq: number;
}
const initialState: GlobalState = {
	metro_on: false,
	drone_on: true,
	drone_pitch: '9',
	drone_octave: '4',
	freq: 400,
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
};

// Create a reducer function
const appReducer = (state: GlobalState, action: AppAction): GlobalState => {
	switch (action.type) {
		case actions.METRO_ON:
			// osc1.start();
			return { ...state, metro_on: !state.metro_on };
		case actions.DRONE_ON:
			// turn off drone osc
			return {
				...state,
				drone_on: !state.drone_on,
			};
		case actions.DRONE_PITCH:
			return { ...state, drone_pitch: action.payload as string };
		case actions.DRONE_OCTAVE:
			return { ...state, drone_octave: action.payload as string };
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
