import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@app/redux/store';
import AddButton from './addNew';
import Link from './link';
import { deleteItem } from '@app/redux/gridReducer';
import { openModal } from '@app/redux/modalReducer';

interface BoxPropTypes {
	box: BoxType;
	linkChildren: LinkType[];
	index: number;
	containerId: string;
}

const Box = ({ box, linkChildren, index, containerId }: BoxPropTypes) => {
	const dispatch = useDispatch<AppDispatch>();
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const renderBox = (boxType: string) => {
		if (boxType === 'default') {
			return linkChildren.map((link, index) => <Link key={link.id} index={index} link={link} containerId={box.id} />);
		} else if (boxType === 'widget') {
			return <h3>widget</h3>;
		}
	};

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={box.id} index={index}>
			{(provided) => (
				<div {...provided.draggableProps} ref={provided.innerRef}>
					<div>
						<h1 {...provided.dragHandleProps}>{box.name}</h1>
						{isEditMode && (
							<>
								<button
									onClick={() => {
										dispatch(
											openModal({
												type: 'BOX',
												id: box.id,
												values: [box.name, '', ''],
												action: 'EDIT'
											})
										);
									}}>
									Edit
								</button>
								<button
									onClick={() => {
										dispatch(deleteItem({ type: 'BOX', itemId: box.id, containerId: containerId }));
									}}>
									Delete
								</button>
							</>
						)}
					</div>

					<div>
						<Droppable droppableId={box.id} type="link">
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{renderBox(box.type)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>

					{isEditMode && <AddButton type="LINK" id={box.id} />}
				</div>
			)}
		</Draggable>
	);
};

export default Box;
