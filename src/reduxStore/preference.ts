import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const preferences = createSlice({
	name: 'preferenceSlice',
	initialState: { isNew: true, isDark: true },
	reducers: {
		setIsNew: (state, action: PayloadAction<boolean>) => {
			state.isNew = action.payload;
		},
		setIsDark: (state, action: PayloadAction<boolean>) => {
			state.isDark = action.payload;
		}
	}
});

export const { setIsNew } = preferences.actions;

export default preferences;
