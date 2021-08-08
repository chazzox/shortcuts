import { createSlice } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { isNewUser: false, isDarkMode: true, isEditMode: true },
	reducers: {
		toggleDrag(state) {
			state.isEditMode = !state.isEditMode;
		},
		oldUser(state) {
			state.isNewUser = false;
		}
	}
});

export const { toggleDrag, oldUser } = settingsReducer.actions;

export default settingsReducer;
