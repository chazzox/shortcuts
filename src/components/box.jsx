import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import DeleteObject from './utils/deleteObject';
import AddNewLink from './addAndEdit/addLink';
import EditBox from './addAndEdit/editBox';

import Link from './link';
import './box.scss';

class Box extends Component {
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
                            <div>
                                <DeleteObject
                                    type="box"
                                    id={this.props.box.id}
                                    objectContainerId={this.props.columnContainerId}
                                />
                                <EditBox id={this.props.box.id} />
                            </div>
                        </div>
                        <div className="boxContainer">
                            {/* inside the box is the link container, this is a place where we drop the links into hence the droppable element */}
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
                            {/* this only renders the add button when edit mode is activated */}
                            {isLink && this.props.editMode ? (
                                <AddNewLink typeId={this.props.box.id} maxWidth="100" type="link" />
                            ) : null}
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
class Weather extends Component {
    render() {
        return 'it do be weather';
    }
}

// linking global values
const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value
    };
};

export default connect(mapStateToProps, null)(Box);
