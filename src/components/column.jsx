import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Box from './box';
import './column.scss';

const ColumnContainer = styled.div`
    ${(props) =>
        props.editMode
            ? `border-style: dashed;border-width: 2px; border-color: white; border-radius: 15px; margin:10px; width: calc(25% - 24px);`
            : `width: calc(25% - 4px);`}
    ${(props) => (props.boxNumber === 0 ? 'height:114px;' : '')}
`;

export default class Column extends Component {
    render() {
        return (
            <Droppable droppableId={this.props.column.id} type="BOX">
                {(provided) => (
                    <ColumnContainer
                        editMode={this.props.editMode}
                        boxNumber={this.props.boxesForColumn.length}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="cont"
                    >
                        {this.props.boxesForColumn.map((box, index) => {
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
                        {this.props.editMode ? <Add /> : null}
                    </ColumnContainer>
                )}
            </Droppable>
        );
    }
}

class Add extends Component {
    render() {
        return <div className="name">yeah</div>;
    }
}
