import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './box.scss'

export default class Box extends Component {
    render() {
        return (
            <Draggable
                isDragDisabled={!this.props.editMode}
                draggableId={this.props.box.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="boxName">{this.props.box.name}</div>
                        <div className="boxContainer">
                            {['234234', 'yeah', 'bruhg'].map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
