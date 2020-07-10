import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import AddNew from './utils/addNew';
import Box from './box';

// we also pass addition styles to these components through the sass file
// however the styles in here are conditional, so require props

export default class Column extends React.Component {
	render() {
		return (
			<div
				style={
					this.props.editMode
						? { borderColor: 'var(--column-border-col)' }
						: { borderColor: 'rgba(255,255,255,0)' }
				}
				className="columnWrapper"
			>
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
			</div>
		);
	}
}
