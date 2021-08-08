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
	height: ${(props) => props.theme.basic.searchbarWhitespaecHeight}px;
	padding: calc(3 * ${(props) => props.theme.basic.primaryPadding}px) 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
	input[type='text'] {
		width: 100%;
		max-width: 700px;
		font-size: 13pt;
		padding: ${(props) => props.theme.basic.primaryPadding}px
			calc(${(props) => props.theme.basic.primaryPadding}px + 1%);
		outline: none !important;
		border: none !important;
		border-radius: 1000px;
		background-color: ${(props) => props.theme.color.boxColor};
		height: calc(
			${(props) => props.theme.basic.searchbarWhitespaecHeight}px -
				(6 * ${(props) => props.theme.basic.primaryPadding}px)
		);
	}
`;

const ColumnContainer = styled.div`
	display: flex;
`;

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.grid);
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const [searchString, updateSearchString] = useState('');

	return (
		<>
			<SearchBar>
				<input
					type="text"
					value={searchString}
					onChange={(event) => updateSearchString(event.target.value)}
					placeholder="Search..."
					onKeyPress={({ key }) => {
						if (key === 'Enter') {
							let url;
							if (
								/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
									searchString
								)
							) {
								url = new URL(searchString);
							} else {
								url = new URL('https://www.google.com/search');
								url.searchParams.append('q', searchString);
							}
							window.location.href = url.toString();
						}
					}}
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
				<ColumnContainer>
					{grid.columnOrder.map((columnId: string, index: number) => (
						<Column
							key={index}
							column={grid.columns[columnId]}
							boxChildren={grid.columns[columnId].order.map((boxId: string) => grid.boxes[boxId])}
						/>
					))}
				</ColumnContainer>
			</DragDropContext>
		</>
	);
};

export default Shortcuts;
