import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Box from './box';

const SectionContainer = styled.div`
    ${(props) =>
        props.editMode
            ? `border-style: dashed;border-width: 2px; border-color: white; border-radius: 15px; margin:10px; width: calc(25% - 24px);`
            : `width: calc(25% - 4px);`}
    ${(props) => (props.boxNumber === 0 ? 'height:114px;' : '')}
    float: left;

    @media screen and (max-width: 1000px) {
        width: 50%;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
    padding-bottom: 30px;
`;

export default class Section extends Component {
    render() {
        return (
            <Droppable droppableId={this.props.section.id}>
                {(provided) => (
                    <SectionContainer
                        editMode={this.props.editMode}
                        boxNumber={this.props.boxesForSection.length}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {this.props.boxesForSection.map((box, index) => (
                            <Box
                                editMode={this.props.editMode}
                                key={box.id}
                                box={box}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </SectionContainer>
                )}
            </Droppable>
        );
    }
}
