import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

const Link = ({ link, index }: { link: LinkType; index: number }) => {
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={link.id} index={index}>
			{(provided) => (
				<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<div>{link.name}</div>
				</div>
			)}
		</Draggable>
	);
};

export default Link;
