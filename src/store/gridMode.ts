import { writable } from 'svelte/store';
import { get } from 'js-cookie';

const initialState = {
	isNew: !!get('hasConfig'),
	dragDisabled: true
};

const { subscribe, set, update } = writable(initialState);

const setIsNew = (isNew: boolean) => set({ ...initialState, ...{ isNew: isNew } });

export default {
	subscribe,
	update,
	setIsNew
};
