import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '@app/redux/gridReducer';
import { openModal } from '@app/redux/modalReducer';

import type { AppDispatch, RootState } from '@app/redux/store';

const Link = ({ link, index, containerId }: { link: LinkType; index: number; containerId: string }) => {
	const dispatch = useDispatch<AppDispatch>();

	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={link.id} index={index}>
			{(provided) => (
				<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
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
				</div>
			)}
		</Draggable>
	);
};

export default Link;
