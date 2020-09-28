import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Box from './box';

const Column = ({ column, boxChildren }: { column: ColumnType; boxChildren: BoxType[] }) => {
	const config = useSelector((state: RootState) => state.config.config);
	return (
		<Droppable droppableId={column.id} type="BOX">
			{(provided) => (
				<div className="columnWrapper" {...provided.droppableProps} ref={provided.innerRef}>
					{boxChildren.map((box, index) => (
						<Box
							key={box.id}
							box={box}
							index={index}
							linkChildren={box.order.map((linkId) => config.links[linkId])}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Column;
