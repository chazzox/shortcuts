import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Box from './box';

const Container = styled.div`
	background color:white;
	float: left;
	width: 25%;
	@media screen and (max-width: 1000px) {
		width: 50%;
	}
	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export default class Section extends Component {
    render() {
        return (
            <Container>
                {this.props.section.id}
                <Droppable droppableId={this.props.section.id}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {this.props.boxesForSection.map((box, index) => (
                                <Box key={box.id} box={box} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </Container>
        );
    }
}
