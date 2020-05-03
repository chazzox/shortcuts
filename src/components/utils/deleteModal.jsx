import React from 'react';
import { connect } from 'react-redux';

import Popup from './modalUtils';
import { deleteObject } from '../../redux/store';

class DeleteModal extends React.Component {
	render() {
		return (
			<Popup>
				<div className="modal">
					<div
						className="buttonGeneral"
						// deleting the object that is being clicked on
						onClick={() => {
							this.props.deleteObject({
								type: this.props.type,
								objectId: this.props.id,
								containerId: this.props.containerId
							});
							this.props.close();
						}}
					>
						Delete
					</div>
					<div className="buttonGeneral" onClick={() => this.props.close()}>
						Cancel
					</div>
				</div>
			</Popup>
		);
	}
}

// 'imports' our global variables
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.value,
		config: state.userSlice.config
	};
};

// 'imports' our global function
const mapDispatchToProps = () => {
	return {
		deleteObject
	};
};

// redux function that connects us to the global state
export default connect(mapStateToProps, mapDispatchToProps())(DeleteModal);
