import { createSlice } from '@reduxjs/toolkit';

const settingsReducer = createSlice({
	name: 'settingsReducer',
	initialState: { isNewUser: true, isDarkMode: false },
	reducers: {}
});

export default settingsReducer;
