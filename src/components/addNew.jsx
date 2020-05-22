import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LinkModal from './modals/linkModal';
import { updateObject } from '../redux/store';
import BoxModal from './modals/boxModal';

// only did this cause the og repo had different widths of add buttons
export const AddObject = styled.button`
	&:hover {
		${(props) => `max-width:${props.maxWidth}%;`}
	}
`;

class AddNew extends React.Component {
	constructor(props) {
		super(props);
		// the open state is being used to decide the visibility of the adding modal
		this.state = {
			open: false
		};
	}
	// functions to view/hide the modal
	handleShow() {
		this.setState({ open: true });
	}
	// functions to view/hide the modal
	handleHide() {
		this.setState({ open: false });
	}
	render() {
		// if edit mode is on, than this is viewable
		return this.props.editMode ? (
			<div className="newObjectButtonContainer">
				<AddObject onClick={() => this.handleShow()} className="addButton" maxWidth={80}>
					Add New
				</AddObject>
				{/* conditional statements to decide which type of modal to display */}
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
