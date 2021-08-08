import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { env } from '../env';
import { defaults, empty } from './templates';

const configReducer = createSlice({
	name: 'configReducer',
	initialState: env === 'development' ? defaults : (empty as Config),
	reducers: {
		onDragEnd(state, action: PayloadAction<DropResult>) {
			// extracting variables from the param
			const { destination, source, draggableId, type } = action.payload;
			// if the destination is null i.e, outside of a drop zone, return to start of drag
			if (!destination) {
				return state;
			}
			// if the destination is null then the droppable has not been moved anywhere, no reordering is needed
			if (destination.droppableId === source.droppableId && destination.index === source.index) {
				return state;
			}

			// selecting the type of parent element that needs to be changes
			const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';
			// selecting the the parent object of the place of drag item origin
			const startParentObject = state[jsonObjectListPointer][source.droppableId];
			// selecting the parent of the destination of the item (only needed if the drag is between boxes)
			const finishParentObject: ColumnType | BoxType = state[jsonObjectListPointer][destination.droppableId];

			// the first if statement is for if the moving is only vertically
			if (startParentObject === finishParentObject) {
				// we have to create an array from the parent so that we do no mutate the original reducer array
				const newChildObjectOrder: string[] = Array.from(startParentObject.order);
				// removes the dragged object from its first position in the array
				newChildObjectOrder.splice(source.index, 1);
				// inserts the object into the place where it was dragged to
				newChildObjectOrder.splice(destination.index, 0, draggableId);
				// updating the config with the new order
				return {
					...state,
					[jsonObjectListPointer]: {
						...state[jsonObjectListPointer],
						[startParentObject.id]: {
							...startParentObject,
							order: newChildObjectOrder
						}
					}
				};
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
			return {
				...state,
				[jsonObjectListPointer]: {
					...state[jsonObjectListPointer],
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
		},
		addBox(state, action: PayloadAction<{ name: string; type: string; columnId: string }>) {
			state.boxes[`box-${'23'}`] = {
				id: `box-${'23'}`,
				name: action.payload.name,
				type: action.payload.type,
				order: []
			};
			state.columns[action.payload.columnId].order.push(`box-${'23'}`);
		},
		addLink(state, action: PayloadAction<{ name: string; url: string; linkIconUrl: string; boxId: string }>) {
			state.links[`link-${23}`] = {
				id: `link-${23}`,
				name: action.payload.name,
				url: action.payload.url,
				linkIconUrl: action.payload.linkIconUrl
			};
			state.boxes[action.payload.boxId].order.push(`link-${23}`);
		},
		setGrid(_state, action: PayloadAction<Config>) {
			return action.payload;
		}
	}
});

export const { onDragEnd, setGrid, addBox, addLink } = configReducer.actions;
export default configReducer;
