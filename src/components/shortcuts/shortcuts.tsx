import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './column';
import store, { AppDispatch, RootState } from '../../redux/store';
import { setConfig } from '../../redux/configReducer';

import './styles/searchbar.scss';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const config = useSelector((state: RootState) => state.config.config);

	// this function does logic for reordering the the order arrays on the end of a reorder
	const onDragEnd = (result: DropResult) => {
		// extracting variables from the param
		const { destination, source, draggableId, type } = result;
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
		const startParentObject = config[jsonObjectListPointer][source.droppableId];
		// selecting the parent of the destination of the item (only needed if the drag is between boxes)
		const finishParentObject: ColumnType | BoxType = config[jsonObjectListPointer][destination.droppableId];

		// the first if statement is for if the moving is only vertically
		if (startParentObject === finishParentObject) {
			// we have to create an array from the parent so that we do no mutate the original reducer array
			const newChildObjectOrder: string[] = Array.from(startParentObject.order);
			// removes the dragged object from its first position in the array
			newChildObjectOrder.splice(source.index, 1);
			// inserts the object into the place where it was dragged to
			newChildObjectOrder.splice(destination.index, 0, draggableId);
			// updating the config with the new order
			dispatch(
				setConfig({
					...config,
					[jsonObjectListPointer]: {
						...config[jsonObjectListPointer],
						[startParentObject.id]: {
							...startParentObject,
							order: newChildObjectOrder
						}
					}
				})
			);
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
		dispatch(
			setConfig({
				...config,
				[jsonObjectListPointer]: {
					...config[jsonObjectListPointer],
					[startParentObject.id]: {
						...startParentObject,
						order: startParentObjectOrder
					},
					[finishParentObject.id]: {
						...finishParentObject,
						order: finishParentObjectOrder
					}
				}
			})
		);
		return;
	};

	const [searchBarString, updateSearchText] = useState('');

	return (
		<>
			<div id="searchBar">
				<input
					type="text"
					value={searchBarString}
					onChange={(event) => updateSearchText(event.target.value)}
					placeholder="Search.."
				/>
			</div>

			<DragDropContext onDragEnd={onDragEnd}>
				{/* mapping through the columns and sending them as args to the column components as well as the box children for it */}
				{config.columnOrder.map((columnId: string, index) => (
					<Column
						key={index}
						column={config.columns[columnId]}
						boxChildren={config.columns[columnId].order.map((boxId: string) => config.boxes[boxId])}
					/>
				))}
			</DragDropContext>
		</>
	);
};

export default Shortcuts;
