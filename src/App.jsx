import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';

import Shortcuts from './components/shortcuts';
import Settings from './components/settings';
import ColorModal from './components/modals/customization/colorModal';
import TutorialModal from './components/modals/tutorialModal';

import { toggle, loadExample, changeTheme } from './redux/store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.tutorialMode,
			colorModalOpen: false,
			searchString: ''
		};
		this.searchBar = React.createRef();
	}

	componentDidMount() {
		this.updateColors();
		this.searchBar.focus();
	}

	componentDidUpdate(prevProps) {
		if (this.props.themeInfo !== prevProps.themeInfo) {
			this.updateColors();
		}
	}

	search() {
		window.location = 'https://www.google.com/search?q=' + encodeURIComponent(this.state.searchString);
	}

	updateColors() {
		document.documentElement.setAttribute('theme', 'custom');
		document.documentElement.style.setProperty('--main-bg-color', '#' + this.props.themeInfo['main-bg-color']);
		document.documentElement.style.setProperty('--nav-bg-color', '#' + this.props.themeInfo['nav-bg-color']);
		document.documentElement.style.setProperty('--box-modal-bg-color', '#' + this.props.themeInfo['box-modal-bg-color']);
		document.documentElement.style.setProperty('--main-text-color', '#' + this.props.themeInfo['main-text-color']);
	}

	close() {
		this.setState({ isOpen: false });
	}

	render() {
		return (
			<>
				<div className="errorContainer" id="betaWarning">
					This webapp is still in beta development, breaking changes can, and mostly likely will be introduced
				</div>
				<div className="navWrapper">
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
					<div className="navIconContainer">
						<h1 className="navSubTitle">made for gamers, by gamers</h1>
						{this.props.editMode ? (
							<>
								<button
									className="buttonGeneral"
									onClick={() => {
										this.setState({ colorModalOpen: true });
									}}
								>
									edit colors
								</button>
								<Link className="link" to="/settings">
									<span className="buttonGeneral">settings</span>
								</Link>
							</>
						) : null}
						{this.state.colorModalOpen ? (
							<ColorModal close={() => this.setState({ colorModalOpen: false })} />
						) : null}
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
				{/* <Shortcuts editMode={this.props.editMode} /> */}
				<Switch>
					<Route path="/settings" render={() => <Settings />} />
					<Route path="/" render={() => <Shortcuts editMode={this.props.editMode} />} />
				</Switch>
				{/* rendering the tutorial modal if it is needed */}
				{this.state.isOpen ? (
					<TutorialModal
						close={() => this.close()}
						loadExample={() => {
							this.props.loadExample();
							this.close();
						}}
					/>
				) : null}
			</>
		);
	}
}

// connecting edit mode and config values to the form from the redux state (this how we get global variables)
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.isEditMode,
		tutorialMode: state.userSlice.tutorialMode,
		config: state.userSlice.config,
		themeInfo: state.userSlice.themeInfo
	};
};

const mapDispatchToProps = () => {
	return {
		// function to toggle the editMode state
		toggle,
		loadExample,
		changeTheme
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
