import React from 'react';

import DeleteModal from './modals/deleteModal';
import LinkModal from './modals/linkModal';
import BoxModal from './modals/boxModal';

export default class ObjectUtils extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeleteModal: false,
			showEditModal: false
		};
	}
	// functions for showing/hiding the delete/edit modals
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
				{/* rendering the box/link modal based on the type we are trying to specify */}
				{this.state.showEditModal ? (
					this.props.type === 'box' ? (
						<BoxModal close={() => this.handleHideEdit()} id={this.props.id} />
					) : (
						<LinkModal close={() => this.handleHideEdit()} id={this.props.id} />
					)
				) : null}
				{/* rendering the delete modal if it has been triggered */}
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
