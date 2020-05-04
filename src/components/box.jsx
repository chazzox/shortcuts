import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import ObjectUtils from './objectUtils';
import AddNew from './addNew';

import Link from './link';

class Box extends React.Component {
	// a box can be one of two things, either a box of links, or a widget, as the two have very different render processes
	// they are split of into different functions
	renderBox(boxType) {
		if (boxType === 'links') {
			return this.renderLinks();
		} else if (boxType === 'widget') {
			return this.renderWidget(this.props.box.widgetType);
		}
	}
	// the if the box is a widget, it will have the widget type prototype
	// we use this to decide which type of widget to return
	renderWidget(widgetType) {
		switch (widgetType) {
			case 'weather':
				return <Weather />;
			case 'Twitter':
				return <Twitter />;
			case 'Reddit':
				return <Reddit />;
			default:
				return <Weather />;
		}
	}
	// this functions renders the links within the box
	renderLinks() {
		// links for box is an array, we use the map function to pass each value of the array to the link object
		return this.props.linksForBox.map((link, index) => (
			<Link key={link.id} index={index} link={link} boxContainerId={this.props.box.id} />
		));
	}

	render() {
		// used for the render process
		const isLink = this.props.box.type === 'links';
		return (
			// wraps the box inside a draggable container, this can not be styled as technically it is not an element at performs logic upon its children
			<Draggable isDragDisabled={!this.props.editMode} draggableId={this.props.box.id} index={this.props.index}>
				{(provided) => (
					// draggable props tells the framework what its actually dragging
					// inner ref is just needed, idk what it does
					<div {...provided.draggableProps} ref={provided.innerRef}>
						{/* dragHandleProps tells the framework what we are dragging the item around with, 
                            in this case we use the box title but this can be changed pretty easily */}
						<div className="boxName" style={{ paddingTop: '10px' }} {...provided.dragHandleProps}>
							{this.props.box.name}
							<ObjectUtils
								id={this.props.box.id}
								editMode={this.props.editMode}
								type="box"
								containerId={this.props.columnContainerId}
							/>
						</div>

						<div className="boxContainer">
							{/* inside the box is the link container, this is a place where we drop the links into hence the droppable element */}
							{/* droppableId is needed for framework to know what it is dragging, type constraints what can be dropped into a given container */}
							<Droppable droppableId={this.props.box.id} type={this.props.box.type}>
								{(provided) => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										{/* this is the function that renders the box */}
										{this.renderBox(this.props.box.type)}
										{/* needed for framework, not sure what it does */}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
							{/* this only renders the addNew button if the box contains link as opposed to a widget box */}
							{isLink ? <AddNew parentId={this.props.box.id} type="link" /> : null}
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

// example of a widget you could add
class Weather extends React.Component {
	render() {
		return 'it do be weather';
	}
}

class Reddit extends React.Component {
	render() {
		return 'reddit';
	}
}

class Twitter extends React.Component {
	render() {
		return 'twitter';
	}
}

// linking global values
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.value
	};
};

export default connect(mapStateToProps, null)(Box);
