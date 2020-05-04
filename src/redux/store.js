import { configureStore, createSlice } from '@reduxjs/toolkit';

import lzw_encode, { lzw_decode } from '../components/utils/compress';
import validator from '../components/utils/validation';
import randomKey from '../components/utils/randomKey';
import { newUser, exampleConfig } from '../userConfigExamples';

export const userSlice = createSlice({
	name: 'editMode',
	initialState: {
		value: false,
		// to be replaced with cookie logic, also where we trigger the tutorial component
		...getUserItems()
	},
	reducers: {
		toggle: (state) => {
			// updating the user cookies when saving their changes
			if (state.value === true) {
				localStorage.setItem('config', lzw_encode(state.config));
				localStorage.setItem('userInfo', lzw_encode(state.userInfo));
			}
			state.value = !state.value;
		},
		// function to load the example config
		loadExample: (state) => {
			state.config = exampleConfig.config;
			state.userInfo = exampleConfig.userInfo;
			return;
		},
		// function to update the config
		updateConfig: (state, action) => {
			state.config = action.payload;
			localStorage.setItem('config', lzw_encode(state.config));
			return;
		},
		// adding object, compatible with bot links and boxes
		addObject: (state, action) => {
			// configuring the selectors based on payload type
			const parentPointer = action.payload.type === 'link' ? 'boxes' : 'columns';
			const itemPointer = action.payload.type === 'link' ? 'links' : 'boxes';
			const orderPointer = action.payload.type === 'link' ? 'linkOrder' : 'boxOrder';
			// pushing the new object to its respective container
			const targetParentComponent = state.config[parentPointer][action.payload.parentId];
			const targetParentObjectOrder = Array.from(targetParentComponent[orderPointer]);
			const itemId = `${action.payload.type}-${randomKey()}`;
			const newParentItemOrder = targetParentObjectOrder;
			newParentItemOrder.push(itemId);
			// updating the state
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
			// updating the localStorage so that it saves before the editMode toggle, even if the user refreshes the browser
			localStorage.setItem('config', lzw_encode(state.config));
			return;
		},
		updateObject: (state, action) => {
			// configuring the selectors based on payload type
			const objectPointer = action.payload.type === 'link' ? 'links' : 'boxes';
			// updating the item
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
			// updating the localStorage so that it saves before the editMode toggle, even if the user refreshes the browser
			localStorage.setItem('config', lzw_encode(state.config));
			return;
		},
		deleteObject: (state, action) => {
			// configuring the selectors based on payload type
			const containerPointer = action.payload.type === 'link' ? 'boxes' : 'columns';
			const arrayType = action.payload.type === 'link' ? 'links' : 'boxes';
			const orderPointer = action.payload.type === 'link' ? 'linkOrder' : 'boxOrder';
			// copying the current link
			const newLinks = { ...state.config.links };
			// if the object is a box we need to delete all of the boxes that the user
			if (action.payload.type === 'box' && state.config.boxes[action.payload.objectId].type === 'links') {
				const linkOrder = Array.from(state.config.boxes[action.payload.objectId].linkOrder);
				linkOrder.map((linkId) => delete newLinks[linkId]);
			}
			// removing the object from its target container order
			let newOrder = Array.from(state.config[containerPointer][action.payload.containerId][orderPointer]);
			newOrder.splice(newOrder.indexOf(action.payload.objectId), 1);
			var newObjectArray = { ...state.config[arrayType] };
			delete newObjectArray[action.payload.objectId];
			// updating the state with our new orders
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
			return;
		},
		changeTheme: (state, action) => {
			state.userInfo.themeInfo = action.payload.themeType;
		}
	}
});

// function to check for user storage
function getUserItems() {
	const temporaryUserConfig = JSON.parse(lzw_decode(localStorage.getItem('config')));
	const temporaryUserExtras = JSON.parse(lzw_decode(localStorage.getItem('userInfo')));
	const shouldReset = validator.isEmpty([temporaryUserConfig]);
	return {
		config: shouldReset ? newUser.config : temporaryUserConfig,
		userInfo: shouldReset ? newUser.userInfo : temporaryUserExtras,
		tutorialMode: shouldReset
	};
}

// exporting all of the functions that interact with the state
export const {
	toggle,
	updateConfig,
	deleteObject,
	updateObject,
	addObject,
	loadExample,
	changeTheme
} = userSlice.actions;

export default configureStore({
	reducer: {
		userSlice: userSlice.reducer
	}
});
