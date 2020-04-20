import React, { Component } from 'react';
import { connect } from 'react-redux';

import { update } from '../redux/store';

class DeleteObject extends Component {
    deleteObject() {
        const containerPointer = this.props.type === 'link' ? 'boxes' : 'columns';
        const arrayType = this.props.type === 'link' ? 'links' : 'boxes';
        const orderPointer = this.props.type === 'link' ? 'linkOrder' : 'boxOrder';
        let newOrder = Array.from(this.props.config[containerPointer][this.props.objectContainerId][orderPointer]);
        // removing the desired box from the boxOrder array
        newOrder.splice(newOrder.indexOf(this.props.id), 1);
        var newObjectArray = { ...this.props.config[arrayType] };
        delete newObjectArray[this.props.id];
        const newState = {
            ...this.props.config,
            [arrayType]: newObjectArray,
            [containerPointer]: {
                ...this.props.config[containerPointer],
                [this.props.objectContainerId]: {
                    ...this.props.config[containerPointer][this.props.objectContainerId],
                    [orderPointer]: newOrder
                }
            }
        };
        this.props.update(newState);
    }
    render() {
        return this.props.editMode ? (
            <button className="editButton" onClick={() => this.deleteObject()}>
                delete
            </button>
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
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(DeleteObject);
