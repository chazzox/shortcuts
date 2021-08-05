import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { RootState } from '../../redux/store';
import Box from './box';

const ColumnWrapper = styled.div`
	width: 25%;
	height: calc(100% - var(--searchbar-whitespace-height));
	float: left;
	padding-left: var(--primary-padding);
	padding-right: var(--primary-padding);
	* {
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
`;

const Column = ({ column, boxChildren }: { column: ColumnType; boxChildren: BoxType[] }) => {
	const grid = useSelector((state: RootState) => state.grid);
	return (
		<Droppable droppableId={column.id} type="BOX">
			{(provided) => (
				<ColumnWrapper {...provided.droppableProps} ref={provided.innerRef}>
					{boxChildren.map((box, index) => (
						<Box
							key={box.id}
							box={box}
							index={index}
							linkChildren={box.order.map((linkId) => grid.links[linkId])}
						/>
					))}
					{provided.placeholder}
				</ColumnWrapper>
			)}
		</Droppable>
	);
};

export default Column;
