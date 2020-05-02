import { configureStore, createSlice } from '@reduxjs/toolkit';

import lzw_encode, { lzw_decode } from '../components/utils/compress';
import validator from '../components/utils/validation';
import randomKey from '../components/utils/randomKey';
import example from '../example';

export const userSlice = createSlice({
	name: 'editMode',
	initialState: {
		value: false,
		// to be replaced with cookie logic, also where we trigger the tutorial component
		...getUserItems()[0]
	},
	reducers: {
		toggle: (state) => {
			// updating the user cookies when saving their changes
			if (state.value === true) {
				localStorage.setItem('config', lzw_encode(state.config));
				localStorage.setItem('extras', lzw_encode(state.extras));
			}
			state.value = !state.value;
		},
		updateConfig: (state, action) => {
			state.config = action.payload;
		},
		addObject: (state, action) => {
			const parentPointer = action.payload.type === 'link' ? 'boxes' : 'columns';
			const itemPointer = action.payload.type === 'link' ? 'links' : 'boxes';
			const orderPointer = action.payload.type === 'link' ? 'linkOrder' : 'boxOrder';
			const targetParentComponent = state.config[parentPointer][action.payload.parentId];
			const targetParentObjectOrder = Array.from(targetParentComponent[orderPointer]);
			const itemId = `${action.payload.type}-${randomKey()}`;
			const newParentItemOrder = targetParentObjectOrder;
			newParentItemOrder.push(itemId);
			state.config = {
				...state.config,
				[parentPointer]: {
					...state.config[parentPointer],
					[action.payload.parentId]: { ...targetParentComponent, [orderPointer]: newParentItemOrder }
				},
				[itemPointer]: {
					...state.config[itemPointer],
					[itemId]: {
						id: itemId,
						...action.payload.content
					}
				}
			};
		},
		updateObject: (state, action) => {
			const objectPointer = action.payload.type === 'link' ? 'links' : 'boxes';
			state.config = {
				...state.config,
				[objectPointer]: {
					...state.config[objectPointer],
					[action.payload.id]: {
						...state.config[objectPointer][action.payload.id],
						...action.payload.content
					}
				}
			};
		},
		deleteObject: (state, action) => {
			const containerPointer = action.payload.type === 'link' ? 'boxes' : 'columns';
			const arrayType = action.payload.type === 'link' ? 'links' : 'boxes';
			const orderPointer = action.payload.type === 'link' ? 'linkOrder' : 'boxOrder';
			const newLinks = { ...state.config.links };
			if (action.payload.type === 'box' && state.config.boxes[action.payload.objectId].type === 'links') {
				const linkOrder = Array.from(state.config.boxes[action.payload.objectId].linkOrder);
				linkOrder.map((linkId) => delete newLinks[linkId]);
			}
			let newOrder = Array.from(state.config[containerPointer][action.payload.containerId][orderPointer]);
			newOrder.splice(newOrder.indexOf(action.payload.objectId), 1);
			var newObjectArray = { ...state.config[arrayType] };
			delete newObjectArray[action.payload.objectId];
			state.config = {
				...state.config,
				links: { ...newLinks },
				[arrayType]: newObjectArray,
				[containerPointer]: {
					...state.config[containerPointer],
					[action.payload.containerId]: {
						...state.config[containerPointer][action.payload.containerId],
						[orderPointer]: newOrder
					}
				}
			};
		}
	}
});

function getUserItems() {
	// maybe add logic to say one thing found but other wasn't?
	const temporaryUserConfig = JSON.parse(lzw_decode(localStorage.getItem('config')));
	const temporaryUserExtras = JSON.parse(lzw_decode(localStorage.getItem('extras')));
	console.log(validator.isEmpty([temporaryUserConfig]));
	return [
		{
			config: validator.isEmpty([temporaryUserConfig]) ? example.config : temporaryUserConfig,
			extras: validator.isEmpty([temporaryUserExtras]) ? example.extras : temporaryUserExtras
		},
		{ errorMessages: '' }
	];
}

export const { toggle, updateConfig, deleteObject, updateObject, addObject } = userSlice.actions;

export default configureStore({
	reducer: {
		userSlice: userSlice.reducer
	}
});
