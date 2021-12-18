import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { deleteItem } from '@app/redux/gridReducer';
import { openModal } from '@app/redux/modalReducer';
import type { AppDispatch, RootState } from '@app/redux/store';
import { Button } from './styled';
import { cleanupURL } from '@app/utils';

const LinkWrapper = styled.a<{ isEditMode: boolean }>`
	display: flex;
	align-items: center;
	cursor: pointer;
	text-decoration: none;
	& > * {
		margin: 5px;
	}
	& > img {
		height: 40px;
		transition: height 0.2s ease;
	}
	& > div > h3,
	& > div > h4 {
		margin: 0;
	}
	& > div > h4 {
		font-size: 0px;
		opacity: 0;
		transition: font-size 0.2s ease, opacity 0.2s ease;
	}
	${(props) =>
		!props.isEditMode &&
		`&:hover {
		& > div > h4 {
			font-size: 15px;
			opacity: 0.6;
		}
		& > img {
			height: 55px;
		}
	}`}
`;

const Link = ({ link, index, containerId }: { link: LinkType; index: number; containerId: string }) => {
	const dispatch = useDispatch<AppDispatch>();
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	return (
		<Draggable isDragDisabled={!isEditMode} draggableId={link.id} index={index}>
			{(provided) => (
				// @ts-expect-error
				<LinkWrapper
					isEditMode={isEditMode}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					href={link.url}
					as={isEditMode ? 'div' : 'a'}>
					<img src={link.linkIconUrl} />
					<div>
						<h3>{link.name}</h3>
						<h4>{cleanupURL(link.url)}</h4>
					</div>
					{isEditMode && (
						<>
							<Button
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
							</Button>
							<Button
								onClick={() => {
									dispatch(deleteItem({ type: 'LINK', itemId: link.id, containerId: containerId }));
								}}>
								Delete
							</Button>
						</>
					)}
				</LinkWrapper>
			)}
		</Draggable>
	);
};

export default Link;
