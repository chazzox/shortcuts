import { createSlice } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { isNewUser: false, isDarkMode: true, isisEditMode: false },
	reducers: {}
});

export default settingsReducer;
