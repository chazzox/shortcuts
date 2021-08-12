import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import store, { AppDispatch, RootState } from 'redux/store';
import AddButton from './addNew';
import Link from './link';
import { Button, ItemTitleWrapper } from './styled';
import { deleteItem } from 'redux/gridReducer';

const BoxContainer = styled.div`
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	padding: 10px;
	border-radius: ${(props) => props.theme.basic.borderRadiusPrimary}px;
	margin-bottom: calc(${(props) => props.theme.basic.borderRadiusPrimary}px * 2);
	display: flex;
	flex-direction: column;
`;

const BoxContent = styled.div``;

interface BoxPropTypes {
	box: BoxType;
	linkChildren: LinkType[];
	index: number;
	containerId: string;
}

const Box = ({ box, linkChildren, index, containerId }: BoxPropTypes) => {
	const dispatch: AppDispatch = store.dispatch;
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
					<ItemTitleWrapper>
						<h1 {...provided.dragHandleProps}>{box.name}</h1>
						{isEditMode && (
							<>
								<Button>Edit</Button>
								<Button
									onClick={() => {
										dispatch(deleteItem({ type: 'BOX', itemId: box.id, containerId: containerId }));
									}}>
									Delete
								</Button>
							</>
						)}
					</ItemTitleWrapper>

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

					{isEditMode && <AddButton type="LINK" containerId={box.id} />}
				</BoxContainer>
			)}
		</Draggable>
	);
};

export default Box;
