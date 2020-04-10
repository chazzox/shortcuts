import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
const BoxContainer = styled.div`
		width: 75%;
		background: #2f3439;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
		text-align: left;
		border-radius: 25px;
		padding-left: 6%;
		padding-top: 5%;
		padding-right: 8%;
		margin: 0 auto 0 auto;
		border-width: 2px solid rgba(255, 255, 255, 0.05);
	}
`;
const BoxName = styled.div`
    font-size: 150%;
    font-weight: 600;
    text-align: center;
}`;

export default class Box extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.box.id} index={this.props.index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <BoxName>{this.props.box.name}</BoxName>
                        <BoxContainer>
                            {['234234', 'yeah', 'bruhg'].map((name, index) => (
                                <div key={index}>{name}</div>
                            ))}
                        </BoxContainer>
                    </div>
                )}
            </Draggable>
        );
    }
}
