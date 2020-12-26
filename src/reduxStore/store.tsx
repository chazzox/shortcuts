import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import preferences from './preference';
import widgets from './widget';
console.log(Cookies.get('isNew'));

const store = configureStore({
	reducer: {
		preferences: preferences.reducer,
		widgets: widgets.reducer
	},
	preloadedState: {
		preferences: {
			isNew: Cookies.get('isNew') == 'false'
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
