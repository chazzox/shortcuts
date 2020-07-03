import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import AddNew from './addNew';
import Box from './box';

// we also pass addition styles to these components through the sass file
// however the styles in here are conditional, so require props
const ColumnWrapper = styled.div`
	${(props) => (props.editMode ? `border-color: var(--column-border-col); ` : `border-color: rgba(255,255,255,0);`)}
`;

export default class Column extends React.Component {
	render() {
		return (
			<ColumnWrapper editMode={this.props.editMode} className="columnWrapper">
				<Droppable droppableId={this.props.column.id} type="BOX">
					{/* the child of a droppable must be a function*/}
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{/* looping through each box and rendering it */}
							{this.props.boxesForColumn.map((box, index) => {
								// if the box is a widget, the map function will through an error
								const linksForBox =
									box.type === 'default' ? box.linkOrder.map((linkId) => this.props.links[linkId]) : null;

								return (
									// passing the props to the box instance
									<Box
										columnContainerId={this.props.column.id}
										key={box.id}
										box={box}
										index={index}
										linksForBox={linksForBox}
									/>
								);
							})}
							{/* needed for framework */}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<AddNew parentId={this.props.column.id} type="box" />
			</ColumnWrapper>
		);
	}
}
