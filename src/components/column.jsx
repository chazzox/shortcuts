import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import AddNewBox from './addAndEdit/addBox';
import Box from './box';
import './column.scss';

// we also pass addition styles to these components through the sass file
// however the styles in here are conditional, so require props
const ColumnWrapper = styled.div`
    ${(props) => (props.editMode ? `border-color: rgba(255,255,255,1); ` : `border-color: rgba(255,255,255,0);`)}
`;
const ColumnContainer = styled.div`
    ${(props) => (props.boxNumber === 0 ? 'height:114px;' : '')}
`;

export default class Column extends Component {
    render() {
        return (
            <ColumnWrapper editMode={this.props.editMode} className="cont">
                <Droppable droppableId={this.props.column.id} type="BOX">
                    {/* the child of a droppable must be a function*/}
                    {(provided) => (
                        <ColumnContainer
                            editMode={this.props.editMode}
                            boxNumber={this.props.boxesForColumn.length}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* looping through each box and rendering it */}
                            {this.props.boxesForColumn.map((box, index) => {
                                // if the box is a widget, the map function will through an error
                                const linksForBox =
                                    box.type === 'links'
                                        ? box.linkOrder.map((linkId) => this.props.links[linkId])
                                        : null;
                                return (
                                    // passing the props to the box instance
                                    <Box
                                        columnContainerId={this.props.column.id}
                                        key={box.id}
                                        box={box}
                                        index={index}
                                        linksForBox={linksForBox}
                                    />
                                );
                            })}
                            {/* needed for framework */}
                            {provided.placeholder}
                        </ColumnContainer>
                    )}
                </Droppable>
                {/* conditionally rendering the add button (editMode dependant) */}
                {this.props.editMode ? <AddNewBox maxWidth="50" typeId={this.props.column.id} /> : null}
            </ColumnWrapper>
        );
    }
}
