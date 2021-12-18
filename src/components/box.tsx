import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import type { AppDispatch, RootState } from '@app/redux/store';
import AddButton from './addNew';
import Link from './link';
import { Button, SimpleBox } from './styled';
import { deleteItem } from '@app/redux/gridReducer';
import { openModal } from '@app/redux/modalReducer';

const BoxContainer = styled(SimpleBox)`
	margin-bottom: calc(${(props) => props.theme.basic.borderRadiusPrimary}px * 2);
	display: flex;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
		rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const BoxContent = styled.div``;

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
				<BoxContainer {...provided.draggableProps} ref={provided.innerRef}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<h1 {...provided.dragHandleProps}>{box.name}</h1>
						{isEditMode && (
							<>
								<Button
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
								</Button>
								<Button
									onClick={() => {
										dispatch(deleteItem({ type: 'BOX', itemId: box.id, containerId: containerId }));
									}}>
									Delete
								</Button>
							</>
						)}
					</div>

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

					{isEditMode && <AddButton type="LINK" id={box.id} />}
				</BoxContainer>
			)}
		</Draggable>
	);
};

export default Box;
