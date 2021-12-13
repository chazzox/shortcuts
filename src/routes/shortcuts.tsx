import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import store, { AppDispatch, RootState } from '@app/redux/store';
import { onDragEnd } from '@app/redux/gridReducer';

import Column from '@app/components/column';
import Modal from '@app/components/modal';
import Navbar from '@app/components/navbar';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.grid);

	return (
		<>
			<DragDropContext
				onDragEnd={(result) => {
					dispatch(onDragEnd(result));
				}}>
				<div id="grid">
					{grid.columnOrder.map((columnId: string, index: number) => (
						<Column
							key={index}
							column={grid.columns[columnId]}
							boxChildren={grid.columns[columnId].order.map((boxId: string) => grid.boxes[boxId])}
						/>
					))}
				</div>
			</DragDropContext>
			<Modal />
		</>
	);
};

export default Shortcuts;
