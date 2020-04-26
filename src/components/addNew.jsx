import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LinkModal from './utils/linkModal';
import { updateObject } from '../redux/store';
import BoxModal from './utils/boxModal';

export const AddObject = styled.button`
    padding-top: 10px;
    padding-bottom: 10px;
    display: inline;
    &:hover {
        ${(props) => `max-width:${props.maxWidth}%;`}
    }
`;

class AddNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleShow() {
        this.setState({ open: true });
    }
    handleHide() {
        this.setState({ open: false });
    }
    render() {
        return this.props.editMode ? (
            <div className="newObjectButtonContainer">
                <AddObject onClick={() => this.handleShow()} className="addButton" maxWidth={80}>
                    Add New
                </AddObject>
                {this.state.open ? (
                    this.props.type === 'link' ? (
                        <LinkModal
                            addMode={true}
                            id={this.props.id}
                            close={() => this.handleHide()}
                            parentId={this.props.parentId}
                        />
                    ) : (
                        <BoxModal
                            addMode={true}
                            id={this.props.id}
                            close={() => this.handleHide()}
                            parentId={this.props.parentId}
                        />
                    )
                ) : null}
            </div>
        ) : null;
    }
}

// linking global values
const mapStateToProps = (state) => {
    return {
        editMode: state.userSlice.value,
        config: state.userSlice.config
    };
};

// linking update functions
const mapDispatchToProps = () => {
    return {
        updateObject
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddNew);
