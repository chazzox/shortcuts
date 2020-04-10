import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Link from './link';
import './box.scss';

export default class Box extends Component {
    state = this.props.box;
    renderBox(boxType) {
        if (boxType === 'links') {
            return this.renderLinks();
        }
    }
    renderWidget(widgetType) {
        switch (widgetType) {
            case 'widget':
                return <Weather />;

            default:
                break;
        }
    }
    renderLinks() {
        return this.props.linksForBox.map((link, index) => (
            <Link key={link.id} index={index} link={link} />
        ));
    }
    render() {
        return (
            <Draggable
                isDragDisabled={!this.props.editMode}
                draggableId={this.state.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="boxName">{this.state.name}</div>
                        <div className="boxContainer">
                            <Droppable droppableId={this.props.box.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {this.renderBox(this.props.box.type)}
                                    </div>
                                )}
                            </Droppable>
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
