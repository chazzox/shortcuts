import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Link from './link';

const Box = ({ box, linkChildren, index }: { box: BoxType; linkChildren: LinkType[]; index: number }) => {
	const isEditMode = useSelector((state: RootState) => state.settings.isisEditMode);

	const renderBox = (boxType: string) => {
		if (boxType === 'default') {
			return linkChildren.map((link, index) => <Link key={link.id} index={index} link={link} />);
		} else if (boxType === 'widget') {
			return <h3>widget</h3>;
		}
	};

	return (
		<div className="boxContainer">
			<Draggable isDragDisabled={isEditMode} draggableId={box.id} index={index}>
				{(provided) => (
					<div {...provided.draggableProps} ref={provided.innerRef}>
						<h1 {...provided.dragHandleProps}>{box.name}</h1>
						<div className="boxContent">
							<Droppable droppableId={box.id} type="link">
								{(provided) => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										{renderBox(box.type)}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				)}
			</Draggable>
		</div>
	);
};

export default Box;
