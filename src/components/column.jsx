import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

// import AddNew from '../globalImport';
import Box from './box';
import './column.scss';

const ColumnContainer = styled.div`
    ${(props) =>
        props.editMode
            ? `border-color: rgba(255,255,255,1); `
            : `border-color: rgba(255,255,255,0);`}
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
                        {/* {this.props.editMode ? (
                            <AddNew maxWidth={'50'} editMode={this.props.editMode} />
                        ) : null} */}
                    </ColumnContainer>
                )}
            </Droppable>
        );
    }
}
