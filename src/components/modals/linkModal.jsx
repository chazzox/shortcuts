import React from 'react';
import { connect } from 'react-redux';

import Popup, { ErrorContainer } from '../utils/modalUtils';
import { updateObject, addObject } from '../../redux/store';
import validation from '../utils/validation';

class LinkModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.addMode ? '' : this.props.config.links[this.props.id].name,
			url: this.props.addMode ? '' : this.props.config.links[this.props.id].url,
			urlIcon: this.props.addMode ? '' : this.props.config.links[this.props.id].linkIconUrl,
			errors: []
		};
	}
	// function that handles the changing of multiple input forms
	handleChange(index, value) {
		switch (index) {
			case 0:
				this.setState({ name: value });
				break;
			case 1:
				this.setState({ url: value });
				break;
			case 2:
				this.setState({ urlIcon: value });
				break;
			default:
				break;
		}
	}
	render() {
		return (
			<Popup>
				<div className="modal">
					<div>
						<input
							type="text"
							className="userInput"
							value={this.state.name}
							onChange={(event) => this.handleChange(0, event.target.value)}
						/>
						<input
							type="text"
							className="userInput"
							value={this.state.url}
							onChange={(event) => this.handleChange(1, event.target.value)}
						/>
						<input
							type="text"
							className="userInput"
							value={this.state.urlIcon}
							onChange={(event) => this.handleChange(2, event.target.value)}
						/>
						{this.state.errors.map((error, index) => (
							<ErrorContainer key={index} errorMessage={error} />
						))}
					</div>
					<div
						className="buttonGeneral"
						onClick={() => {
							// validating the user entries
							const errorList = [];
							if (validation.isEmpty([this.state.name, this.state.url])) {
								errorList.push('error message for stuff being empty');
							}
							if (!validation.isURL([this.state.url, this.state.urlIcon])) {
								errorList.push('one of url not valid u boomer retard');
							}
							// rendering the errors and returning if there are none
							if (errorList.length !== 0) {
								this.setState({ errors: errorList });
								return;
							}
							// running add/edit function based on the mode passed a prop
							if (this.props.addMode)
								this.props.addObject({
									type: 'link',
									parentId: this.props.parentId,
									content: {
										name: this.state.name,
										url: this.state.url,
										linkIconUrl: this.state.urlIcon
									}
								});
							else
								this.props.updateObject({
									id: this.props.id,
									type: 'link',
									content: {
										name: this.state.name,
										url: this.state.url,
										linkIconUrl: this.state.urlIcon
									}
								});
							// closing the modal
							this.props.close();
						}}
					>
						Save Changes
					</div>
					<div className="buttonGeneral" onClick={() => this.props.close()}>
						Cancel
					</div>
				</div>
			</Popup>
		);
	}
}

// linking global values
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode,
		config: state.userSlice.config
	};
};

// linking update functions
const mapDispatchToProps = () => {
	return {
		updateObject,
		addObject
	};
};

// connecting component to the redux state
export default connect(mapStateToProps, mapDispatchToProps())(LinkModal);
