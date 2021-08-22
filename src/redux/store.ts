import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gridSlice from './gridReducer';
import modalSlice from './modalReducer';
import settingsSlice from './settingsReducer';

const persistConfig = { key: 'root', version: 1, storage };

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		grid: gridSlice.reducer,
		settings: settingsSlice.reducer,
		modal: modalSlice.reducer
	})
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
