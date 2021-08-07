import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../redux/store';

import Link from './link';

const BoxContainer = styled.div`
	background-color: var(--box-color);
	padding: 10px;
	border-radius: var(--primary-border-radius);
	margin-bottom: calc(var(--primary-padding) * 2);
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
						{isEditMode && <button>X</button>}
					</BoxContent>
				</BoxContainer>
			)}
		</Draggable>
	);
};

export default Box;
