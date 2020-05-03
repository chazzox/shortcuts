import React from 'react';
import { connect } from 'react-redux';

import Popup, { ErrorContainer } from './modalUtils';
import { updateObject, addObject } from '../../redux/store';
import validation from './validation';

class BoxModal extends React.Component {
	constructor(props) {
		super(props);
		/// setting up the states for the component
		this.state = { name: this.props.addMode ? '' : this.props.config.boxes[this.props.id].name, errors: [] };
		// this means we don't have to write ()=>this.onchange later on
		this.onChange = this.onChange.bind(this);
	}
	// function for changing the name state whenever the input is change, we can filter out unwanted chars in this function if we want (eg /?<>#@, etc)
	onChange(val) {
		this.setState({ name: val.target.value });
	}
	render() {
		return (
			<Popup>
				<div className="modal">
					<input type="text" className="userInput" value={this.state.name} onChange={this.onChange} />
					{/* rendering the errors if there are any post addition */}
					{this.state.errors.map((error, index) => (
						<ErrorContainer key={index} errorMessage={error} />
					))}
					<div
						className="buttonGeneral"
						onClick={() => {
							// setting up our error lists
							const errorList = [];
							if (validation.isEmpty([this.state.name])) {
								errorList.push('error message for stuff being empty');
							}
							// if there are any errors we set them as the error state and return so none of the other functions are broken
							if (errorList.length !== 0) {
								this.setState({ errors: errorList });
								return;
							}
							// running add/edit function based on the mode passed a prop
							if (this.props.addMode)
								this.props.addObject({
									type: 'box',
									parentId: this.props.parentId,
									content: {
										name: this.state.name,
										type: 'links',
										linkOrder: []
									}
								});
							else
								this.props.updateObject({
									id: this.props.id,
									type: 'box',
									content: {
										name: this.state.name
									}
								});
							// closing the box modal
							this.props.close();
						}}
					>
						Update Box
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
		updateObject,
		addObject
	};
};

// redux function that connects us to the global state
export default connect(mapStateToProps, mapDispatchToProps())(BoxModal);
