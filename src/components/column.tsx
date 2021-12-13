import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import type { RootState } from '@app/redux/store';
import AddButton from './addNew';
import Box from './box';

const Column = ({ column, boxChildren }: { column: ColumnType; boxChildren: BoxType[] }) => {
	const grid = useSelector((state: RootState) => state.grid);
	const isEditMode = useSelector((root: RootState) => root.settings.isEditMode);

	return (
		<Droppable droppableId={column.id} type="BOX">
			{(provided) => (
				<div className="column" {...provided.droppableProps} ref={provided.innerRef}>
					{boxChildren.map((box, index) => (
						<Box
							key={box.id}
							box={box}
							index={index}
							linkChildren={box.order.map((linkId) => grid.links[linkId])}
							containerId={column.id}
						/>
					))}
					{provided.placeholder}
					{isEditMode && <AddButton type="BOX" id={column.id} />}
				</div>
			)}
		</Droppable>
	);
};

export default Column;
