import React from 'react';
import { connect } from 'react-redux';

import Shortcuts from './components/shortcuts';
import PopupWrapper from './components/utils/modalUtils';
import { toggle, loadExample, changeTheme } from './redux/store';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: this.props.tutorialMode
		};
	}
	close() {
		this.setState({ isOpen: false });
	}
	// every time the component receives new params we check if the theme has changes
	componentDidUpdate() {
		console.log(this.props.userInfo);
		if (this.props.userInfo.themeInfo !== 'custom')
			document.documentElement.setAttribute('theme', this.props.userInfo.themeInfo);
		// future logic for custom themes can go here
	}
	render() {
		return (
			<div className="globalWrapper">
				<div className="navWrapper">
					<h1 className="navTitle">SHORTCUTS {this.props.editMode ? ' - editmode' : ''}</h1>
					<div className="navIconContainer">
						<h1 className="navSubTitle">made for gamers, by gamers</h1>
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
						<button
							className="buttonGeneral"
							onClick={() => {
								this.props.changeTheme({
									themeType: this.props.userInfo.themeInfo === 'light' ? 'dark' : 'light'
								});
							}}
						>
							toggleMode
						</button>
					</div>
				</div>
				<div>
					<Shortcuts editMode={this.props.editMode} />
				</div>
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
			</div>
		);
	}
}

class TutorialModal extends React.Component {
	render() {
		return (
			<PopupWrapper>
				<div className="modal">
					<div>a bitch ass really never been to the site before</div>
					<button className="buttonGeneral" onClick={() => this.props.loadExample()}>
						loadExample
					</button>
					<button className="buttonGeneral" onClick={() => this.props.close()}>
						close
					</button>
				</div>
			</PopupWrapper>
		);
	}
}

// connecting edit mode and config values to the form from the redux state (this how we get global variables)
const mapStateToProps = (state) => {
	return {
		editMode: state.userSlice.value,
		tutorialMode: state.userSlice.tutorialMode,
		config: state.userSlice.config,
		userInfo: state.userSlice.userInfo
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
