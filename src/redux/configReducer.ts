import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import test from './templates/example';

const configReducer = createSlice({
	name: 'configReducer',
	initialState: {
		isNewUser: true,
		config: test as Config
	},
	reducers: {
		setConfig(state, action: PayloadAction<Config>) {
			state.config = action.payload;
		}
	}
});

export const { setConfig } = configReducer.actions;
export default configReducer;
