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

const Add = styled.div`
    margin: 0 auto;
    width: 100%;
    text-align: center;
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
                        {this.props.boxesForSection.map((box, index) => {
                            // is the box a link type
                            const isLink = box.type === 'links';
                            const linksForBox = isLink
                                ? box.linkOrder.map((linkId) => this.props.links[linkId])
                                : null;
                            return (
                                <Box
                                    editMode={this.props.editMode}
                                    key={box.id}
                                    box={box}
                                    index={index}
                                    linksForBox={linksForBox}
                                />
                            );
                        })}
                        {provided.placeholder}
                        {this.props.editMode ? <Add>add</Add> : null}
                    </SectionContainer>
                )}
            </Droppable>
        );
    }
}
