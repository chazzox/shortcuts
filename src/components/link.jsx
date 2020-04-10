import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './link.scss';

export default class Link extends Component {
    render() {
        return (
            <Draggable
                isDragDisabled={true}
                draggableId={this.props.link.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {this.props.link.name}
                    </div>
                )}
            </Draggable>
        );
    }
}
