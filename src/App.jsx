import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Cookie from 'js-cookie';

import Shortcuts from './components/shortcuts';
import Settings from './components/settings/settings';
import Navbar from './components/navbar';
import TutorialModal from './components/views/tutorialModal';

import { toggle, loadExample, changeTheme } from './redux/store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.tutorialMode,
			colorModalOpen: false,
			searchString: '',
			showWarning: !(Cookie.get('showWarning') === 'false')
		};
		this.searchBar = React.createRef();
	}

	componentDidMount() {
		this.updateColors();
	}

	componentDidUpdate(prevProps) {
		if (this.props.themeInfo !== prevProps.themeInfo) {
			this.updateColors();
		}
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
				{this.state.showWarning ? (
					<div className="errorContainer" id="betaWarning">
						<div
							id="close"
							onClick={() => {
								Cookie.set('showWarning', 'false');
								this.setState({ showWarning: false });
							}}
						/>
						<span>
							This webapp is still in beta development, breaking changes can, and mostly likely will be
							introduced
						</span>
					</div>
				) : null}
				<Navbar />
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
