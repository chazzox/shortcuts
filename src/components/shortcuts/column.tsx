import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Box from './box';

import './styles/column.scss'; // stylesheet for columns

const Column = ({ column, boxChildren }: { column: ColumnType; boxChildren: BoxType[] }) => {
	const grid = useSelector((state: RootState) => state.config.grid);
	return (
		<Droppable droppableId={column.id} type="BOX">
			{(provided) => (
				<div className="columnWrapper" {...provided.droppableProps} ref={provided.innerRef}>
					{boxChildren.map((box, index) => (
						<Box
							key={box.id}
							box={box}
							index={index}
							linkChildren={box.order.map((linkId) => grid.links[linkId])}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Column;
