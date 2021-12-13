import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import store, { AppDispatch, RootState } from '@app/redux/store';
import { toggleDrag } from '@app/redux/settingsReducer';
import { onDragEnd } from '@app/redux/gridReducer';

import Column from '@app/components/column';
import Modal from '@app/components/modal';
import { URLregex } from '@app/utils';

const Shortcuts = () => {
	const dispatch: AppDispatch = store.dispatch;
	const grid = useSelector((state: RootState) => state.grid);
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const [searchString, updateSearchString] = useState('');

	return (
		<>
			<div>
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
				<input
					type="checkbox"
					checked={isEditMode}
					onChange={() => {
						dispatch(toggleDrag());
					}}
				/>
				<Link to="/settings">Settings</Link>
			</div>
			<DragDropContext
				onDragEnd={(result) => {
					dispatch(onDragEnd(result));
				}}>
				<div>
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
