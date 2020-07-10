import { configureStore, createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';
import validator from '../components/utils/validation';
import randomKey from '../components/utils/randomKey';
import { exampleConfig } from '../template/example';
import { newUser } from '../template/newUser';

// the saving system foe the
export const userSlice = createSlice({
	name: 'editMode',
	initialState: {
		isEditMode: false,
		// to be replaced with cookie logic, also where we trigger the tutorial component
		...getUserItems()
	},
	reducers: {
		toggle: (state, action) => {
			if (action.payload.toggleOverride !== undefined) {
				state.isEditMode = action.payload.toggleOverride;
			}
			if (state.isEditMode === true) {
				// updating the user cookies when saving their changes
				localStorage.setItem('config', JSON.stringify(state.config));
				localStorage.setItem('themeInfo', JSON.stringify(state.themeInfo));
				localStorage.setItem('notes', JSON.stringify(state.notes));
			}
			state.isEditMode = !state.isEditMode;
		},
		// function to load the example config
		loadExample: (state) => {
			state.config = exampleConfig.config;
			state.themeInfo = exampleConfig.themeInfo;
			state.notes = exampleConfig.notes;
			// this here is the main reason why i would like to change the saving system, if we add a new section, we will need to re-save it in the local storage
			localStorage.setItem('config', JSON.stringify(state.config));
			localStorage.setItem('themeInfo', JSON.stringify(state.themeInfo));
			localStorage.setItem('notes', JSON.stringify(state.notes));
			return;
		},
		// function to update the config
		updateConfig: (state, action) => {
			state.config = action.payload;
			localStorage.setItem('config', JSON.stringify(state.config));
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
			localStorage.setItem('config', JSON.stringify(state.config));
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
			localStorage.setItem('config', JSON.stringify(state.config));
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
			//if the object is a widget then we need to delete the cookies associated with the widget
			else if (action.payload.type === 'box' && state.config.boxes[action.payload.objectId].type === 'widget') {
				switch (state.config.boxes[action.payload.objectId].widgetType) {
					case 'twitter':
						Cookie.remove('userTwitterOAuth');
						break;
					case 'reddit':
						Cookie.remove('redditOauth');
						break;
					case 'notes':
						const newNotes = { ...state.notes };
						delete newNotes[state.config.boxes[action.payload.objectId]];
						state.notes = { ...newNotes };
						break;
					default:
						break;
				}
			}
			// removing the object from its target container order
			let newOrder = Array.from(state.config[containerPointer][action.payload.containerId][orderPointer]);
			newOrder.splice(newOrder.indexOf(action.payload.objectId), 1);
			const newObjectArray = { ...state.config[arrayType] };
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
		addWidget: (state, action) => {
			const itemId = `box-${randomKey()}`;
			const newOrder = Array.from(state.config.columns[action.payload.parentId].boxOrder);
			newOrder.push(itemId);

			// if a widget requires extra params, add them here
			let widgetExtras;
			switch (action.payload.content.widgetType) {
				case 'notes':
					const newID = `note-${randomKey()}`;
					widgetExtras = { noteId: newID };
					state.notes[newID] = { value: '' };
					break;
				default:
					widgetExtras = {};
					break;
			}

			state.config = {
				...state.config,
				columns: {
					...state.config.columns,
					[action.payload.parentId]: {
						...state.config.columns[action.payload.parentId],
						boxOrder: newOrder
					}
				},
				boxes: {
					...state.config.boxes,
					[itemId]: { id: itemId, type: 'widget', ...action.payload.content, ...widgetExtras }
				}
			};
			localStorage.setItem('config', JSON.stringify(state.config));
			localStorage.setItem('notes', JSON.stringify(state.notes));
			return;
		},
		changeTheme: (state, action) => {
			state.themeInfo = { ...action.payload.themeInfo };
			localStorage.setItem('themeInfo', JSON.stringify({ ...action.payload.themeInfo }));
			return;
		},
		setNote: (state, action) => {
			state.notes[action.payload.noteId].value = action.payload.noteValue;
			localStorage.setItem('notes', JSON.stringify(state.notes));
			return;
		}
	}
});

// function to check for user storage this returns values for if no storage is found
// soon to be changed
function getUserItems() {
	const temporaryUserConfig = JSON.parse(localStorage.getItem('config'));
	const temporaryUserExtras = JSON.parse(localStorage.getItem('themeInfo'));
	const temporaryUserNotes = JSON.parse(localStorage.getItem('notes'));
	const shouldReset = validator.isEmpty([temporaryUserConfig]);
	return {
		config: shouldReset ? newUser.config : temporaryUserConfig,
		themeInfo: shouldReset ? newUser.themeInfo : temporaryUserExtras,
		notes: shouldReset ? newUser.notes : temporaryUserNotes,
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
	addWidget,
	loadExample,
	changeTheme,
	setNote
} = userSlice.actions;

export default configureStore({
	reducer: {
		userSlice: userSlice.reducer
	}
});
