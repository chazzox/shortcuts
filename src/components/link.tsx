import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from 'redux/gridReducer';

import { AppDispatch, RootState } from 'redux/store';
import styled from 'styled-components';
import { Button, ItemTitleWrapper } from './styled';

const LinkWrapper = styled.div``;

const Link = ({ link, index, containerId }: { link: LinkType; index: number; containerId: string }) => {
	const dispatch = useDispatch<AppDispatch>();

	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={link.id} index={index}>
			{(provided) => (
				<LinkWrapper {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<ItemTitleWrapper>
						<div>{link.name}</div>
						{isEditMode && (
							<Button
								onClick={() => {
									dispatch(deleteItem({ type: 'LINK', itemId: link.id, containerId: containerId }));
								}}>
								Delete
							</Button>
						)}
					</ItemTitleWrapper>
				</LinkWrapper>
			)}
		</Draggable>
	);
};

export default Link;
