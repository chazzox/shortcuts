import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from '../config';

const configReducer = createSlice({
	name: 'configReducer',
	initialState: {
		isNewUser: true,
		config: {
			links: {},
			boxes: {},
			columns: {
				'column-1': {
					id: 'column-1',
					order: []
				},
				'column-2': {
					id: 'column-2',
					order: []
				},
				'column-3': {
					id: 'column-3',
					order: []
				},
				'column-4': {
					id: 'column-4',
					order: []
				}
			},
			columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
		} as Config
	},
	reducers: {
		setConfig: (state, action: PayloadAction<Config>) => {
			state.config = action.payload;
		}
	}
});

export const { setConfig } = configReducer.actions;
export default configReducer;
