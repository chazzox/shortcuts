import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { setConfig } from '../../redux/configReducer';
import { AppDispatch, RootState } from '../../redux/store';

const Shortcuts = () => {
	const dispatch: AppDispatch = useDispatch();
	const config = useSelector((state: RootState) => state.config.config);

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId, type } = result;

		// if the destination is null i.e, outside of a drop zone, return to start of drag
		if (!destination) {
			return;
		}
		// if the destination is the same as the the start of the drag
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		// this is where it starts to get interesting
		// we use the next two constants as a way to decide which parts of the json we are writing to
		// this is done in an effort of code optimization as i realized that the function was a copy paste in
		// two if statements if i didn't do this
		const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';

		// the objects you are dragging from and into
		const startParentObject = config[jsonObjectListPointer][source.droppableId];
		const finishParentObject = config[jsonObjectListPointer][destination.droppableId];

		// if the drag and dropping is only in the vertical plane
		if (startParentObject === finishParentObject) {
			// order of current draggables
			const newChildObjectOrder = Array.from(startParentObject.order || []);
			// removes the dragged object from its first position in the array
			newChildObjectOrder.splice(source.index, 1);
			// inserts the object into the place where it was dragged to
			newChildObjectOrder.splice(destination.index, 0, draggableId);
			// overwrites the current state to show the changes post drag
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

		// if you understand that, well done, now were doing horizontal and vertical plane drag n' dropping, gl
		// this creates an array from objectOrder (listOrder, boxOrder)
		const startParentObjectOrder = Array.from(startParentObject.order || []);
		// since we know the draggable has moved from the original container, we do not need to replace it
		startParentObjectOrder.splice(source.index, 1);

		const finishParentObjectOrder = Array.from(finishParentObject.order || []);
		// inserts the object into the destinations objectOrder array
		finishParentObjectOrder.splice(destination.index, 0, draggableId);

		// overwriting the old state to include the changes post drag
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

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				{/* mapping the column array to the column instances, this is where all of the rendering of the shortcuts content begins */}
				{config.columnOrder.map((columnId) => {
					const column = config.columns[columnId];
					const boxesForColumn = column.order.map((boxId: string) => config.boxes[boxId]);
					// return (
					// 	<Column
					// 		key={column.id}
					// 		links={this.props.config.links}
					// 		column={column}
					// 		boxesForColumn={boxesForColumn}
					// 	/>
					// );

					return 'test';
				})}
			</DragDropContext>
		</>
	);
};

export default Shortcuts;
