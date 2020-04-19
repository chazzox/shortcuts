import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import AddNewBox from './addNew/addBox'
import Box from './box';
import './column.scss';
const ColumnWrapper = styled.div`
    ${(props) =>
        props.editMode
            ? `border-color: rgba(255,255,255,1); `
            : `border-color: rgba(255,255,255,0);`}
`;
const ColumnContainer = styled.div`
    ${(props) => (props.boxNumber === 0 ? 'height:114px;' : '')}
`;

export default class Column extends Component {
    render() {
        return (
            <ColumnWrapper editMode={this.props.editMode} className="cont">
                <Droppable droppableId={this.props.column.id} type="BOX">
                    {(provided) => (
                        <ColumnContainer
                            editMode={this.props.editMode}
                            boxNumber={this.props.boxesForColumn.length}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
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
                        </ColumnContainer>
                    )}
                </Droppable>
                {this.props.editMode ? (
                    <AddNewBox
                        style={{ paddingTop: '10px', paddingBottom: '10px' }}
                        maxWidth="50"
                        type="box"
                        typeId={this.props.column.id}
                    />
                ) : null}
            </ColumnWrapper>
        );
    }
}
