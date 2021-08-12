import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import store, { AppDispatch, RootState } from 'redux/store';
import { toggleDrag } from 'redux/settingsReducer';
import { onDragEnd } from 'redux/gridReducer';

import { Toggle } from 'components/styled';
import Column from 'components/column';
import { URLregex } from 'utils';

const SearchBar = styled.div`
	width: 100%;
	height: ${(props) => props.theme.basic.whitespaceHeight}px;
	padding: calc(3 * ${(props) => props.theme.basic.paddingPrimary}px) 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
	input[type='text'] {
		width: 100%;
		max-width: 700px;
		font-size: 13pt;
		padding: ${(props) => props.theme.basic.paddingPrimary}px calc(${(props) => props.theme.basic.paddingPrimary}px + 1%);
		outline: none !important;
		border: none !important;
		border-radius: 100em;
		background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
		height: calc(
			${(props) => props.theme.basic.whitespaceHeight}px - (6 * ${(props) => props.theme.basic.paddingPrimary}px)
		);
	}
	input[type='text']:focus {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
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
							if (URLregex.test(searchString)) {
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
				<Link to="/settings">Settings</Link>
			</SearchBar>
			<DragDropContext
				onDragEnd={(result) => {
					dispatch(onDragEnd(result));
				}}>
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
