import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { toggle, updateConfig } from '../redux/store';
import Column from './column';

class Shortcuts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allowHover: true
		};
		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragStart = () => {
		// its worth saying that this could be replaced with a css class if you only want to disable hover for specific components
		this.setState({ allowHover: false });
	};
	// updates state after the drag is finished and allowing hover css functionality
	// sorry you have to read this
	onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;
		// allowing again hover to happen
		this.setState({ allowHover: true });
		// if the destination is null i.e, outside of a drop zone, return to start of drag
		if (!destination) {
			return;
		}
		// if the destination is the same as the the start of the drag
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		// this is where it starts to get interesting
		// we use the next two constants as a way to decide which parts of the json we are writing to
		// this is done in an effort of code optimization as i realized that the function was a copy paste in
		// two if statements if i didn't do this
		const jsonObjectListPointer = type === 'BOX' ? 'columns' : 'boxes';
		const jsonOrderPointer = type === 'BOX' ? 'boxOrder' : 'linkOrder';

		// the objects you are dragging from and into
		const startParentObject = this.props.config[jsonObjectListPointer][source.droppableId];
		const finishParentObject = this.props.config[jsonObjectListPointer][destination.droppableId];
		// if the drag and dropping is only in the vertical plane
		if (startParentObject === finishParentObject) {
			// order of current draggables
			const newChildObjectOrder = Array.from(startParentObject[jsonOrderPointer]);
			// removes the dragged object from its first position in the array
			newChildObjectOrder.splice(source.index, 1);
			// inserts the object into the place where it was dragged to
			newChildObjectOrder.splice(destination.index, 0, draggableId);
			// overwrites the current state to show the changes post drag
			this.props.updateConfig({
				...this.props.config,
				[jsonObjectListPointer]: {
					...this.props.config[jsonObjectListPointer],
					[startParentObject.id]: {
						...startParentObject,
						[jsonOrderPointer]: newChildObjectOrder
					}
				}
			});

			return;
		}

		// if you understand that, well done, now were doing horizontal and vertical plane drag n' dropping, gl
		// this creates an array from objectOrder (listOrder, boxOrder)
		const startParentObjectOrder = Array.from(startParentObject[jsonOrderPointer]);
		// since we know the draggable has moved from the original container, we do not need to replace it
		startParentObjectOrder.splice(source.index, 1);

		const finishParentObjectOrder = Array.from(finishParentObject[jsonOrderPointer]);
		// inserts the object into the destinations objectOrder array
		finishParentObjectOrder.splice(destination.index, 0, draggableId);

		// overwriting the old state to include the changes post drag
		this.props.updateConfig({
			...this.props.config,
			[jsonObjectListPointer]: {
				...this.props.config[jsonObjectListPointer],
				[startParentObject.id]: {
					...startParentObject,
					[jsonOrderPointer]: startParentObjectOrder
				},
				[finishParentObject.id]: {
					...finishParentObject,
					[jsonOrderPointer]: finishParentObjectOrder
				}
			}
		});
		return;
	};
	render() {
		return (
			// drag drop context is the area that we can put draggables into, we use this to wrap any draggable item
			<span id="shortcutsContainer">
				<DragDropContext
					style={{
						border: '2px solid white',
						'max-width': '1500px',
						'margin-left': 'auto',
						'margin-right': 'auto'
					}}
					onDragStart={this.onDragStart}
					onDragEnd={this.onDragEnd}
				>
					{/* mapping the column array to the column instances, this is where all of the rendering of the shortcuts content begins */}
					{this.props.config.columnOrder.map((columnId) => {
						const column = this.props.config.columns[columnId];
						const boxesForColumn = column.boxOrder.map((boxId) => this.props.config.boxes[boxId]);
						return (
							<Column
								key={column.id}
								style={this.state.allowHover ? null : { pointerEvents: 'none' }}
								editMode={this.props.editMode}
								links={this.props.config.links}
								column={column}
								boxesForColumn={boxesForColumn}
							/>
						);
					})}
				</DragDropContext>
			</span>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode,
		config: state.userSlice.config
	};
};

// linking update functions
const mapDispatchToProps = () => {
	return {
		toggle,
		updateConfig
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(Shortcuts);
