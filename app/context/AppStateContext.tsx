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
	on: boolean;
	freq: number;
}
const initialState: GlobalState = {
	on: false,
	freq: 400,
};

type AppAction = { type: string };

interface AppStateContextType {
	state: GlobalState;
	dispatch: Dispatch<AppAction>;
}
// Create a reducer function
const appReducer = (state: GlobalState, action: AppAction): GlobalState => {
	switch (action.type) {
		case 'ON':
			osc1.start();
			console.log(state.on);
			return { ...state, on: !state.on };
		case 'FREQ':
			return {
				...state,
			};
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
