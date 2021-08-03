import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { isNewUser: false, isDarkMode: true, isEditMode: true },
	reducers: {
		setDrag(state, { payload: newDragState }: PayloadAction<boolean>) {
			state.isEditMode = newDragState;
		}
	}
});

export const { setDrag } = settingsReducer.actions;

export default settingsReducer;
