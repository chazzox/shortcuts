import React, { Component } from 'react';
import styled from 'styled-components';

const AddLink = styled.div`
    ${(props) => (props.editMode ? 'display: block;' : 'display:none;')}
    &:hover {
        ${(props) => `max-width:${props.maxWidth}%;`}
    }
`;

export default class AddNew extends Component {
    render() {
        return (
            <div className=".editButtonWrapper">
                <AddLink
                    editMode={this.props.editMode}
                    className="addObject"
                    maxWidth={this.props.maxWidth}
                >
                    Add New Link
                </AddLink>
            </div>
        );
    }
}
