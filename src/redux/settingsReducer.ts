import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: {
		isNewUser: true,
		isDarkMode: true,
		isEditMode: false,
		isRandBackgroundEnabled: false
	},
	reducers: {
		setDrag(state, newValue: PayloadAction<boolean>) {
			state.isEditMode = newValue.payload;
		},
		toggleDrag(state) {
			state.isEditMode = !state.isEditMode;
		},

		oldUser(state) {
			state.isNewUser = false;
		},
		toggleRandBackground(state) {
			state.isRandBackgroundEnabled = !state.isRandBackgroundEnabled;
		}
	}
});

export const { toggleDrag, oldUser, toggleRandBackground, setDrag } = settingsReducer.actions;

export default settingsReducer;
