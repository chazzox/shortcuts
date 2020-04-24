import React from 'react';

import DeleteModal from './deleteModal';
import LinkModal from './linkModal';
import BoxModal from './boxModal';

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
            <div style={{ display: 'inline-block' }}>
                <button className="editButton" onClick={() => this.handleShowDelete()}>
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
