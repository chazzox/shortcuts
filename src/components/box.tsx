import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../redux/store';
import AddButton from './addNew';
import Link from './link';

const BoxContainer = styled.div`
	background-color: ${(props) => props.theme.color.boxColor};
	padding: 10px;
	border-radius: ${(props) => props.theme.basic.borderRadius}px;
	margin-bottom: calc(${(props) => props.theme.basic.primaryPadding}px * 2);
	display: flex;
	flex-direction: column;
`;

const BoxContent = styled.div``;

const Box = ({ box, linkChildren, index }: { box: BoxType; linkChildren: LinkType[]; index: number }) => {
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const renderBox = (boxType: string) => {
		if (boxType === 'default') {
			return linkChildren.map((link, index) => <Link key={link.id} index={index} link={link} />);
		} else if (boxType === 'widget') {
			return <h3>widget</h3>;
		}
	};

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={box.id} index={index}>
			{(provided) => (
				<BoxContainer {...provided.draggableProps} ref={provided.innerRef}>
					<h1 {...provided.dragHandleProps}>{box.name}</h1>
					<BoxContent>
						<Droppable droppableId={box.id} type="link">
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{renderBox(box.type)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</BoxContent>
					{isEditMode && <AddButton type="LINK" />}
				</BoxContainer>
			)}
		</Draggable>
	);
};

export default Box;
