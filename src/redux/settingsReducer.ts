import { createSlice } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: {
		isNewUser: true,
		isDarkMode: true,
		isEditMode: false,
		isRandBackgroundEnabled: false
	},
	reducers: {
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

export const { toggleDrag, oldUser, toggleRandBackground } = settingsReducer.actions;

export default settingsReducer;
