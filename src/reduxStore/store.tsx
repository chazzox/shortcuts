import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';

import preferences from './preference';
import widgets from './widget';
console.log(Object.fromEntries(document.cookie.split(';').map((cookie) => cookie.split('='))).isNew == false);

const store = configureStore({
	reducer: {
		preferences: preferences.reducer,
		widgets: widgets.reducer
	},
	preloadedState: {
		preferences: {
			isNew: Object.fromEntries(document.cookie.split(';').map((cookie) => cookie.split('='))).isNew == undefined
		}
	}
});

export type dispatchType = typeof store.dispatch;

const wrapper = ({ element }: any) => {
	return <Provider store={store}>{element}</Provider>;
};

type stateType = ReturnType<typeof store.getState>;
export type { stateType };
export default wrapper;
