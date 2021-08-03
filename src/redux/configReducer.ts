import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

import test from './templates/example';

const configReducer = createSlice({
	name: 'configReducer',
	initialState: {
		isNewUser: true,
		grid: test as Config
	},
	reducers: {
		onDragEnd(state, action: PayloadAction<DropResult>) {
			// extracting variables from the param
			const { destination, source, draggableId, type } = action.payload;
			// if the destination is null i.e, outside of a drop zone, return to start of drag
			if (!destination) {
				return;
			}
			// if the destination is null then the droppable has not been moved anywhere, no reordering is needed
			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return;
			}

			// selecting the type of parent element that needs to be changes
			const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';
			// selecting the the parent object of the place of drag item origin
			const startParentObject = state.grid[jsonObjectListPointer][source.droppableId];
			// selecting the parent of the destination of the item (only needed if the drag is between boxes)
			const finishParentObject: ColumnType | BoxType = state.grid[jsonObjectListPointer][destination.droppableId];

			// the first if statement is for if the moving is only vertically
			if (startParentObject === finishParentObject) {
				// we have to create an array from the parent so that we do no mutate the original reducer array
				const newChildObjectOrder: string[] = Array.from(startParentObject.order);
				// removes the dragged object from its first position in the array
				newChildObjectOrder.splice(source.index, 1);
				// inserts the object into the place where it was dragged to
				newChildObjectOrder.splice(destination.index, 0, draggableId);
				// updating the config with the new order
				state.grid = {
					...state.grid,
					[jsonObjectListPointer]: {
						...state.grid[jsonObjectListPointer],
						[startParentObject.id]: {
							...startParentObject,
							order: newChildObjectOrder
						}
					}
				};

				return;
			}
			// creates a new array for original container order
			const startParentObjectOrder: string[] = Array.from(startParentObject.order);
			// removing the object from its original position
			startParentObjectOrder.splice(source.index, 1);
			// creates a new array for destination container order
			const finishParentObjectOrder: string[] = Array.from(finishParentObject.order);
			// inserting the object id into the new place in its order
			finishParentObjectOrder.splice(destination.index, 0, draggableId);
			// updating the config state
			state.grid = {
				...state.grid,
				[jsonObjectListPointer]: {
					...state.grid[jsonObjectListPointer],
					[startParentObject.id]: {
						...startParentObject,
						order: startParentObjectOrder
					},
					[finishParentObject.id]: {
						...finishParentObject,
						order: finishParentObjectOrder
					}
				}
			};

			return;
		}
	}
});

export const { onDragEnd } = configReducer.actions;
export default configReducer;
