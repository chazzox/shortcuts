import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import AddNew from '../globalImports';
import Link from './link';
import './box.scss';

export default class Box extends Component {
    renderBox(boxType) {
        if (boxType === 'links') {
            return this.renderLinks();
        } else if (boxType === 'widget') {
            return this.renderWidget(this.props.box.widgetType);
        }
    }
    renderWidget(widgetType) {
        switch (widgetType) {
            case 'weather':
                return <Weather />;
            default:
                return <Weather />;
        }
    }
    renderLinks() {
        return this.props.linksForBox.map((link, index) => (
            <Link key={link.id} index={index} link={link} editMode={this.props.editMode} />
        ));
    }
    render() {
        const isLink = this.props.box.type === 'links';
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
                        <div className="boxName" style={{ paddingTop: '10px' }}>
                            {this.props.box.name}
                        </div>
                        <div className="boxContainer">
                            <Droppable droppableId={this.props.box.id} type={this.props.box.type}>
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.renderBox(this.props.box.type)}
                                        {isLink ? (
                                            <AddNew
                                                maxWidth={'100'}
                                                editMode={this.props.editMode}
                                            />
                                        ) : null}
                                        {provided.placeholder}
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
