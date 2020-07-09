import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggle } from '../redux/store';
import validate from './utils/validation';

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

	search() {
		if (validate.isURL([this.state.searchString])) {
			window.location = this.state.searchString;
		} else {
			window.location = 'https://www.google.com/search?q=' + encodeURIComponent(this.state.searchString);
		}
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
					{this.props.location.pathname === '/settings' ? (
						<Link className="link" to="/" onClick={() => this.props.toggle({ toggleOverride: true })}>
							<span className="buttonGeneral">home</span>
						</Link>
					) : (
						<Link className="link" to="/settings" onClick={() => this.props.toggle({ toggleOverride: true })}>
							<span className="buttonGeneral">settings</span>
						</Link>
					)}
					<button
						className="buttonGeneral"
						onClick={() => {
							// if we are navigating to back from settings, we do not want to trigger the 
							if (this.props.location.pathname === '/settings') return;
							// editMode toggle, use this props to do conditional styling/rendering
							// in any main component, the value: this.props.editMode will be available for use
							this.props.toggle({});
						}}
					>
						{/* this is a conditional statement to render save or edit inside the button */}
						{this.props.editMode ? 'save' : 'edit'}
					</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Navbar));
