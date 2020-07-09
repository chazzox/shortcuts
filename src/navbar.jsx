import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ColorModal from './components/modals/customization/colorModal';
import { toggle } from './redux/store';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colorModalOpen: false,
			searchString: ''
		};
		this.searchBar = React.createRef();
	}

	componentDidMount() {
		this.searchBar.focus();
	}

	render() {
		return (
			<div id="navWrapper">
				<h1 className="navTitle">SHORTCUTS {this.props.editMode ? ' - editmode' : ''}</h1>
				<input
					id="searchBar"
					value={this.state.searchString}
					onChange={(event) => this.setState({ searchString: event.target.value })}
					ref={(input) => {
						this.searchBar = input;
					}}
					onKeyPress={(event) => {
						if (event.key === 'Enter') this.search();
					}}
				/>
				<div id="navIconContainer">
					<h1 className="navSubTitle">made for gamers, by gamers</h1>
					<Link className="link" to="/settings">
						<span className="buttonGeneral">settings</span>
					</Link>
					<button
						className="buttonGeneral"
						onClick={() => {
							// editMode toggle, use this props to do conditional styling/rendering
							// in any main component, the value: this.props.editMode will be available for use
							this.props.toggle();
						}}
					>
						{/* this is a conditional statement to render save or edit inside the button */}
						{this.props.editMode ? 'save' : 'edit'}
					</button>
					{/* color customizations, this is in no way the final implementation and i encourage change to the workflow
						of the changing, eg when removing a custom theme, it is just a showcase of how you could roughly do it */}
				</div>
			</div>
		);
	}
}

// connecting edit mode and config values to the form from the redux state (this how we get global variables)
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode
	};
};

const mapDispatchToProps = () => {
	return {
		// function to toggle the editMode state
		toggle
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
