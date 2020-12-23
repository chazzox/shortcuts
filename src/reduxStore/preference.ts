import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const preferences = createSlice({
	name: 'preferenceSlice',
	initialState: { isNew: true },
	reducers: {
		setIsNew: (state, action: PayloadAction<boolean>) => {
			state.isNew = action.payload;
		}
	}
});

export const { setIsNew } = preferences.actions;

export default preferences;
