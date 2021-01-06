import { writable } from 'svelte/store';
import { get } from 'js-cookie';

const initialState = {
	isNew: !!get('hasConfig')
};

const { subscribe, set } = writable(initialState);

const setIsNew = (isNew: boolean) => set({ ...initialState, ...{ isNew: isNew } });

export default {
	subscribe,
	setIsNew
};
