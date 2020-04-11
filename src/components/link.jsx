import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './link.scss';

export default class Link extends Component {
    render() {
        return (
            <Draggable
                isDragDisabled={!this.props.editMode}
                draggableId={this.props.link.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div>{this.props.link.name}</div>
                        <div>{this.props.link.url}</div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}
