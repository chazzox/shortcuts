import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import type { RootState } from '@app/redux/store';
import AddButton from './addNew';
import Box from './box';

const ColumnWrapper = styled.div`
	height: calc(100% - ${(props) => props.theme.basic.whitespaceHeight}px);
	padding: ${(props) => props.theme.basic.paddingPrimary}px 0px;
	display: flex;
	flex-direction: column;
	flex: 1;
	margin: 0 15px;
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
	const isEditMode = useSelector((root: RootState) => root.settings.isEditMode);

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
							containerId={column.id}
						/>
					))}
					{provided.placeholder}
					{isEditMode && <AddButton type="BOX" id={column.id} />}
				</ColumnWrapper>
			)}
		</Droppable>
	);
};

export default Column;
