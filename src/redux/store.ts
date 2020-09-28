import { configureStore } from '@reduxjs/toolkit';

import config from './configReducer';
import settings from './settingsReducer';

const store = configureStore({
	reducer: {
		config: config.reducer,
		settings: settings.reducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
