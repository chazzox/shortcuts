import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import store, { AppDispatch, RootState } from '../redux/store';
import { toggleDrag } from '../redux/settingsReducer';
import { onDragEnd } from '../redux/gridReducer';

import { Toggle } from '../components/styled';
import Column from '../components/column';

const SearchBar = styled.div`
	width: 100%;
	height: var(--searchbar-whitespace-height);
	padding: calc(3 * var(--primary-padding)) 0;
	display: flex;
	justify-content: space-between;
	input[type='text'] {
		width: 100%;
		max-width: 700px;
		font-size: 13pt;
		padding: var(--primary-padding) calc(var(--primary-padding) + 1%);
		outline: none !important;
		border: none !important;
		border-radius: 1000px;
		background-color: var(--box-color);
		height: calc(var(--searchbar-whitespace-height) - (6 * var(--primary-padding)));
	}
`;

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.grid);
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const [searchBarString, updateSearchText] = useState('');

	return (
		<>
			<SearchBar>
				<input
					type="text"
					value={searchBarString}
					onChange={(event) => updateSearchText(event.target.value)}
					placeholder="Search..."
				/>
				<Toggle
					type="checkbox"
					checked={isEditMode}
					onChange={() => {
						dispatch(toggleDrag());
					}}
				/>
			</SearchBar>
			<DragDropContext
				onDragEnd={(result) => {
					dispatch(onDragEnd(result));
				}}
			>
				{/* mapping through the columns and sending them as args to the column components as well as the box children for it */}
				{grid.columnOrder.map((columnId: string, index: number) => (
					<Column
						key={index}
						column={grid.columns[columnId]}
						boxChildren={grid.columns[columnId].order.map((boxId: string) => grid.boxes[boxId])}
					/>
				))}
			</DragDropContext>
		</>
	);
};

export default Shortcuts;
