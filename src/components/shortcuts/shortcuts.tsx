import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import Column from './column';
import store, { AppDispatch, RootState } from '../../redux/store';
import { onDragEnd } from '../../redux/gridReducer';

import './styles/searchbar.scss';
import { toggleDrag } from '../../redux/settingsReducer';
import styled from 'styled-components';

const Toggle = styled.input`
	display: inline-block;
	height: 32px;
	width: 52px;
	border-radius: 15px;
	position: relative;
	margin: 0;
	border: 2px solid #474755;
	transition: all 0.2s ease;
	&:after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
		/* TBD: change transition times so that background color and transform take different periods of time */
		transition: all 0.05s cubic-bezier(0.5, 0.1, 0.75, 1.35);
	}
	&:checked {
		border-color: white;
	}
	&:checked:after {
		transform: translatex(20px);
	}
`;

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.grid);
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const [searchBarString, updateSearchText] = useState('');

	React.useEffect(() => {
		console.log(grid);
	}, [grid]);

	return (
		<>
			<div id="searchBar">
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
			</div>
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
