import { createSlice } from '@reduxjs/toolkit';
import { env } from '@app/env';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: {
		isNewUser: env !== 'development' ? true : false,
		isDarkMode: true,
		isEditMode: env === 'development' ? true : false
	},
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
