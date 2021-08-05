import { configureStore } from '@reduxjs/toolkit';

import gridSlice from './gridReducer';
import settingsSlice from './settingsReducer';

const store = configureStore({
	reducer: {
		grid: gridSlice.reducer,
		settings: settingsSlice.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
