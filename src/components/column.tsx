import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { RootState } from '../redux/store';
import AddButton from './addNew';
import Box from './box';

const ColumnWrapper = styled.div`
	width: 25%;
	height: calc(100% - ${(props) => props.theme.basic.searchbarWhitespaecHeight}px);
	padding: ${(props) => props.theme.basic.primaryPadding}px 0px;
	display: flex;
	flex-direction: column;
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
						/>
					))}
					{provided.placeholder}
					{isEditMode && <AddButton type="BOX" containerId={column.id} />}
				</ColumnWrapper>
			)}
		</Droppable>
	);
};

export default Column;
