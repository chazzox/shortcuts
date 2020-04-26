import React from 'react';

import DeleteModal from './utils/deleteModal';
import LinkModal from './utils/linkModal';
import BoxModal from './utils/boxModal';

export default class ObjectUtils extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            showEditModal: false
        };
    }
    handleShowDelete() {
        this.setState({ showDeleteModal: true });
    }
    handleHideDelete() {
        this.setState({ showDeleteModal: false });
    }
    handleShowEdit() {
        this.setState({ showEditModal: true });
    }
    handleHideEdit() {
        this.setState({ showEditModal: false });
    }
    render() {
        return this.props.editMode ? (
            <div
                style={
                    this.props.type === 'box'
                        ? { display: 'inline-block' }
                        : { display: 'inline-block', position: 'absolute', top: '5px' }
                }
            >
                <button className="buttonGeneral" onClick={() => this.handleShowDelete()}>
                    delete
                </button>
                <button className="editLinkButton" onClick={() => this.handleShowEdit()}></button>
                {this.state.showEditModal ? (
                    this.props.type === 'box' ? (
                        <BoxModal close={() => this.handleHideEdit()} id={this.props.id} />
                    ) : (
                        <LinkModal close={() => this.handleHideEdit()} id={this.props.id} />
                    )
                ) : null}
                {this.state.showDeleteModal ? (
                    <DeleteModal
                        close={() => this.handleHideDelete()}
                        id={this.props.id}
                        type={this.props.type}
                        containerId={this.props.containerId}
                    />
                ) : null}
            </div>
        ) : null;
    }
}
