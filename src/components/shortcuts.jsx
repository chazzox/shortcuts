import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import example from '../example';
import Section from './section';

export default class Shortcuts extends Component {
    state = example.config;

    // updates state after the drag is finished
    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        // if the destination is null i.e, outisde of a drop zone, return to start of drag
        if (!destination) {
            return;
        }
        // if the destination is the same as the the start of the drag
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // rewriting the newState to show the new order
        const startSection = this.state.sections[source.droppableId];
        const finishSection = this.state.sections[destination.droppableId];

        // if the drag is isoloated within one column
        if (startSection === finishSection) {
            const newBoxOrder = Array.from(startSection.boxOrder);
            newBoxOrder.splice(source.index, 1);
            newBoxOrder.splice(destination.index, 0, draggableId);

            // overwriting the new column array in the section order
            const newState = {
                ...this.state,
                sections: {
                    ...this.state.sections,
                    [startSection.id]: {
                        ...startSection,
                        boxOrder: newBoxOrder
                    }
                }
            };
            this.setState(newState);
            return;
        }
        const startBoxOrder = Array.from(startSection.boxOrder);
        startBoxOrder.splice(source.index, 1);
        const newStartSection = { ...startSection, boxOrder: startBoxOrder };
        const finishBoxOrder = Array.from(finishSection.boxOrder);
        finishBoxOrder.splice(destination.index, 0, draggableId);
        const newFinishSection = { ...finishSection, boxOrder: finishBoxOrder };
        const newState = {
            ...this.state,
            sections: {
                ...this.state.sections,
                [newStartSection.id]: newStartSection,
                [newFinishSection.id]: newFinishSection
            }
        };
        this.setState(newState);
        return;
    };
    render() {
        return (
            <DragDropContext
                style={{ border: '2px solid white' }}
                onDragEnd={this.onDragEnd}
            >
                {this.state.sectionOrder.map((sectionId) => {
                    const section = this.state.sections[sectionId];
                    const boxesForSection = section.boxOrder.map(
                        (boxId) => this.state.boxes[boxId]
                    );

                    return (
                        <Section
                            editMode={this.props.editMode}
                            links={this.state.links}
                            key={section.id}
                            section={section}
                            boxesForSection={boxesForSection}
                        />
                    );
                })}
            </DragDropContext>
        );
    }
}
