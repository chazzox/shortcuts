import React from 'react';

import LinkModal from './modals/linkModal';
import BoxModal from './modals/boxModal';

export default class ObjectUtils extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditModal: false
		};
	}

	handleShowEdit() {
		this.setState({ showEditModal: true });
	}
	handleHideEdit() {
		this.setState({ showEditModal: false });
	}
	render() {
		return this.props.editMode ? (
			<>
				<button className="editLinkButton" onClick={() => this.handleShowEdit()}></button>
				{/* rendering the box/link modal based on the type we are trying to specify */}
				{this.state.showEditModal ? (
					this.props.type === 'box' ? (
						<BoxModal
							close={() => this.handleHideEdit()}
							id={this.props.id}
							type={this.props.type}
							containerId={this.props.containerId}
						/>
					) : (
						<LinkModal
							close={() => this.handleHideEdit()}
							id={this.props.id}
							type={this.props.type}
							containerId={this.props.containerId}
						/>
					)
				) : null}
			</>
		) : null;
	}
}
