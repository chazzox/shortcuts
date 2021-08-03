import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './column';
import store, { AppDispatch, RootState } from '../../redux/store';
import { onDragEnd } from '../../redux/configReducer';

import './styles/searchbar.scss';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const config = useSelector((state: RootState) => state.config.grid);

	// this function does logic for reordering the the order arrays on the end of a reorder

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
			<DragDropContext onDragEnd={(result) => dispatch(onDragEnd(result))}>
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
