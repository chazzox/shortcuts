import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

import { env } from 'env';
import { defaults, empty } from 'utils';

const configReducer = createSlice({
	name: 'configReducer',
	initialState: env === 'development' ? defaults : empty,
	reducers: {
		onDragEnd(state, action: PayloadAction<DropResult>) {
			const { destination, source, draggableId, type } = action.payload;
			if (!destination) {
				return;
			}
			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return;
			}
			const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';
			const startParentObject = state[jsonObjectListPointer][source.droppableId];
			const finishParentObject: ColumnType | BoxType = state[jsonObjectListPointer][destination.droppableId];
			// if item is only moving vertically
			if (startParentObject === finishParentObject) {
				// removing reference to order object
				const newChildObjectOrder: string[] = Array.from(startParentObject.order);
				newChildObjectOrder.splice(source.index, 1);
				newChildObjectOrder.splice(destination.index, 0, draggableId);
				state[jsonObjectListPointer][startParentObject.id].order = newChildObjectOrder;
				return;
			}
			// If item is moving across parent containers
			const startParentObjectOrder: string[] = Array.from(startParentObject.order);
			startParentObjectOrder.splice(source.index, 1);
			const finishParentObjectOrder: string[] = Array.from(finishParentObject.order);
			finishParentObjectOrder.splice(destination.index, 0, draggableId);
			state[jsonObjectListPointer][startParentObject.id].order = startParentObjectOrder;
			state[jsonObjectListPointer][finishParentObject.id].order = finishParentObjectOrder;
		},
		addNewItem(
			state,
			action: PayloadAction<{
				type: 'BOX' | 'LINK';
				typeContent: Omit<LinkType, 'id'> | Omit<BoxType, 'id'>;
				containerId: string;
			}>
		) {
			const id = `${action.payload.type === 'BOX' ? 'box' : 'link'}-${Math.floor(Math.random() * 1000)}`;
			const itemPointer = action.payload.type === 'BOX' ? 'boxes' : 'links';
			const orderPointer = action.payload.type === 'BOX' ? 'columns' : 'boxes';
			// throws error for some reason, literally no clue why
			// const pointers = action.payload.type === 'BOX' ? ['boxes', 'columns'] : ['links', 'boxes'];
			Object.assign(state[itemPointer], { [id]: { id: `${id}`, ...action.payload.typeContent } });
			state[orderPointer][action.payload.containerId].order.push(id);
		},
		setGrid(_state, action: PayloadAction<Config>) {
			return action.payload;
		},
		deleteItem(state, action: PayloadAction<{ type: 'BOX' | 'LINK'; containerId: string; itemId: string }>) {
			const itemPointer = action.payload.type === 'BOX' ? 'boxes' : 'links';
			const parentPointer = action.payload.type === 'BOX' ? 'columns' : 'boxes';
			// typically this could be considered inefficient, however array sizes should never reach a size where that would be felt
			state[parentPointer][action.payload.containerId].order = state[parentPointer][
				action.payload.containerId
			].order.filter((el) => el !== action.payload.itemId);
			delete state[itemPointer][action.payload.itemId];
		},
		editItem(
			state,
			action: PayloadAction<{
				type: 'BOX' | 'LINK';
				itemId: string;
				content: { name: string };
			}>
		) {
			const itemPointer = action.payload.type === 'BOX' ? 'boxes' : 'links';
			state[itemPointer][action.payload.itemId].name = action.payload.content.name;
			if (action.payload.type === 'LINK') {
			}
		}
	}
});

export const { onDragEnd, setGrid, addNewItem, deleteItem, editItem } = configReducer.actions;
export default configReducer;
