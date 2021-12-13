import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '@app/redux/gridReducer';
import { openModal } from '@app/redux/modalReducer';

import type { AppDispatch, RootState } from '@app/redux/store';
import styled from 'styled-components';

const LinkWrapper = styled.div``;

const Link = ({ link, index, containerId }: { link: LinkType; index: number; containerId: string }) => {
	const dispatch = useDispatch<AppDispatch>();

	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={link.id} index={index}>
			{(provided) => (
				<LinkWrapper {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<div>
						<div>{link.name}</div>
						{isEditMode && (
							<>
								<button
									onClick={() => {
										dispatch(
											openModal({
												type: 'LINK',
												id: link.id,
												values: [link.name, link.url, link.linkIconUrl],
												action: 'EDIT'
											})
										);
									}}>
									Edit
								</button>
								<button
									onClick={() => {
										dispatch(deleteItem({ type: 'LINK', itemId: link.id, containerId: containerId }));
									}}>
									Delete
								</button>
							</>
						)}
					</div>
				</LinkWrapper>
			)}
		</Draggable>
	);
};

export default Link;
