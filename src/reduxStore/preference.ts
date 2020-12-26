import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const preferences = createSlice({
	name: 'preferenceSlice',
	initialState: { doesConfigExist: true, isDark: true, hasLoaded: false },
	reducers: {
		setDoesConfigExist: (state, action: PayloadAction<boolean>) => {
			state.doesConfigExist = action.payload;
		},
		setIsDark: (state, action: PayloadAction<boolean>) => {
			state.isDark = action.payload;
		}
	}
});

export const { setDoesConfigExist } = preferences.actions;

export default preferences;
