import React from 'react';
import { connect } from 'react-redux';

import Popup, { ErrorContainer } from '../utils/modalUtils';
import { updateObject, addObject, addWidget } from '../../redux/store';
import validation from '../utils/validation';
import expand from '../../assets/expand.svg';
class BoxModal extends React.Component {
	constructor(props) {
		super(props);
		/// setting up the states for the component
		this.state = {
			name: this.props.addMode ? '' : this.props.config.boxes[this.props.id].name,
			errors: [],
			isWidget: false,
			widgetType: null
		};
		// this means we don't have to write ()=>this.onchange later on
		this.onChange = this.onChange.bind(this);
	}
	// function for changing the name state whenever the input is change, we can filter out unwanted chars in this function if we want (eg /?<>#@, etc)
	onChange(val) {
		this.setState({ name: val.target.value });
	}
	handleCheckbox() {
		this.setState({ isWidget: !this.state.isWidget });
	}

	render() {
		return (
			<Popup>
				<div className="modal">
					{this.props.addMode ? (
						<input type="checkbox" checked={this.state.isWidget} onChange={() => this.handleCheckbox()} />
					) : null}
					{this.state.isWidget ? (
						<Select
							options={{
								optionsArr: [
									{ value: 'weather', name: 'weather near you' },
									{ value: 'reddit', name: 'reddit timeline' },
									{ value: 'twitter', name: 'twitter timeline' }
								],
								defaultIndex: 0
							}}
							updateType={(value) => this.setState({ widgetType: value })}
						/>
					) : null}
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
							if (this.props.addMode) {
								if (!this.state.isWidget) {
									this.props.addObject({
										type: 'box',
										parentId: this.props.parentId,
										content: {
											name: this.state.name,
											type: 'links',
											linkOrder: []
										}
									});
								} else {
									this.props.addWidget({
										parentId: this.props.parentId,
										content: {
											name: this.state.name,
											widgetType: this.state.widgetType
										}
									});
								}
							} else
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

class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = { optionsOpen: false, selected: this.props.options.optionsArr[this.props.options.defaultIndex] };
	}
	setNewOption(widgetItem) {
		this.setState({ selected: widgetItem, optionsOpen: false });
		this.props.updateType(widgetItem.value);
	}
	renderOptions() {
		return this.props.options.optionsArr.map((item, index) => (
			<div key={index} value={item.value} className="option" onClick={() => this.setNewOption(item)}>
				{item.name}
			</div>
		));
	}
	render() {
		return (
			<div id="selectContainer">
				<div id="selectPreview" onClick={() => this.setState({ optionsOpen: !this.state.optionsOpen })}>
					<span className="currentSelected">{this.state.selected.name}</span>
					<img
						id="expand"
						style={this.state.optionsOpen ? { transform: 'scaleY(-1)' } : null}
						src={expand}
						alt="expand icon"
					/>
				</div>
				{this.state.optionsOpen ? <div className="optionContainer">{this.renderOptions()}</div> : null}
			</div>
		);
	}
}

// 'imports' our global variables
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode,
		config: state.userSlice.config
	};
};

// 'imports' our global function
const mapDispatchToProps = () => {
	return {
		updateObject,
		addObject,
		addWidget
	};
};

// redux function that connects us to the global state
export default connect(mapStateToProps, mapDispatchToProps())(BoxModal);
