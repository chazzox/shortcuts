import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './column';
import store, { AppDispatch, RootState } from '../../redux/store';
import { setConfig } from '../../redux/configReducer';

import './shortcuts.scss';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const config = useSelector((state: RootState) => state.config.config);

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';
		const startParentObject = config[jsonObjectListPointer][source.droppableId];
		const finishParentObject: ColumnType | BoxType = config[jsonObjectListPointer][destination.droppableId];
		console.log(type);
		console.log(jsonObjectListPointer);
		console.log(source.droppableId);
		console.log(startParentObject);
		if (startParentObject === finishParentObject) {
			const newChildObjectOrder = Array.from(startParentObject.order);
			newChildObjectOrder.splice(source.index, 1);
			newChildObjectOrder.splice(destination.index, 0, draggableId);
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
		const startParentObjectOrder = Array.from(startParentObject.order);
		startParentObjectOrder.splice(source.index, 1);
		const finishParentObjectOrder = Array.from(finishParentObject.order);
		finishParentObjectOrder.splice(destination.index, 0, draggableId);
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
