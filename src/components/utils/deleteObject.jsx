import React, { Component } from 'react';
import { connect } from 'react-redux';

import Popup from './popupWrapper';
import { update } from '../../redux/store';

class DeleteObject extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    handleShow() {
        this.setState({ open: true });
    }
    handleHide() {
        console.log('hiding?');
        this.setState({ open: false });
    }
    deleteObject(type, objectId, containerId) {
        const containerPointer = type === 'link' ? 'boxes' : 'columns';
        const arrayType = type === 'link' ? 'links' : 'boxes';
        const orderPointer = type === 'link' ? 'linkOrder' : 'boxOrder';
        const newLinks = { ...this.props.config.links };
        if (type === 'box' && this.props.config.boxes[objectId].type === 'links') {
            const linkOrder = Array.from(this.props.config.boxes[objectId].linkOrder);
            linkOrder.map((linkId) => delete newLinks[linkId]);
        }
        let newOrder = Array.from(this.props.config[containerPointer][containerId][orderPointer]);
        newOrder.splice(newOrder.indexOf(objectId), 1);
        var newObjectArray = { ...this.props.config[arrayType] };
        delete newObjectArray[objectId];
        const newState = {
            ...this.props.config,
            links: { ...newLinks },
            [arrayType]: newObjectArray,
            [containerPointer]: {
                ...this.props.config[containerPointer],
                [containerId]: {
                    ...this.props.config[containerPointer][containerId],
                    [orderPointer]: newOrder
                }
            }
        };
        this.props.update(newState);
        this.handleHide();
    }
    render() {
        let modal = this.state.open ? (
            <Popup>
                <div className="modal">
                    <div
                        className="editButton"
                        onClick={() => this.deleteObject(this.props.type, this.props.id, this.props.objectContainerId)}
                    >
                        Delete {this.props.type}
                    </div>
                    <div className="editButton" onClick={() => this.handleHide()}>
                        Cancel
                    </div>
                </div>
            </Popup>
        ) : null;
        return this.props.editMode ? (
            <div style={{ display: 'inline-block' }}>
                <button className="editButton" onClick={() => this.handleShow()}>delete</button>
                {modal}
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
        update
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(DeleteObject);
