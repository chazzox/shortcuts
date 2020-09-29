import { createSlice } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { isNewUser: false, isDarkMode: true, isEditMode: true },
	reducers: {}
});

export default settingsReducer;
