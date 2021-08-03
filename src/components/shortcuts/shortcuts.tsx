import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './column';
import store, { AppDispatch, RootState } from '../../redux/store';
import { onDragEnd } from '../../redux/configReducer';

import './styles/searchbar.scss';
import { toggleDrag } from '../../redux/settingsReducer';
import JiggleContainer from '../jiggle';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.config.grid);
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

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
				<input
					type="checkbox"
					className="toggle"
					checked={isEditMode}
					onChange={() => {
						dispatch(toggleDrag());
					}}
				/>
			</div>
			<DragDropContext
				onDragEnd={(result) => {
					dispatch(onDragEnd(result));
				}}
			>
				{/* mapping through the columns and sending them as args to the column components as well as the box children for it */}
				{grid.columnOrder.map((columnId: string, index) => (
					<>
						{isEditMode ? (
							<JiggleContainer>
								<Column
									key={index}
									column={grid.columns[columnId]}
									boxChildren={grid.columns[columnId].order.map((boxId: string) => grid.boxes[boxId])}
								/>
							</JiggleContainer>
						) : (
							<Column
								key={index}
								column={grid.columns[columnId]}
								boxChildren={grid.columns[columnId].order.map((boxId: string) => grid.boxes[boxId])}
							/>
						)}
					</>
				))}
			</DragDropContext>
		</>
	);
};

export default Shortcuts;
