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

	render() {
		if (this.props.userInfo.themeType !== 'custom')
			document.documentElement.setAttribute('theme', this.props.userInfo.themeType);
		else {
			document.documentElement.setAttribute('theme', 'custom');
			document.documentElement.style.setProperty('--main-bg-color', this.props.userInfo.themeInfo.mainBg);
			document.documentElement.style.setProperty('--main-text-color', this.props.userInfo.themeInfo.fontMain);
			document.documentElement.style.setProperty('--nav-bg-color', this.props.userInfo.themeInfo.navBg);
			document.documentElement.style.setProperty('--box-modal-bg-color', this.props.userInfo.themeInfo.boxModalBg);
		}
		return (
			<div className="globalWrapper">
				<div className="navWrapper">
					<h1 className="navTitle">SHORTCUTS {this.props.editMode ? ' - editmode' : ''}</h1>
					<div className="navIconContainer">
						<h1 className="navSubTitle">made for gamers, by gamers</h1>
						{this.props.editMode ? (
							<button
								className="buttonGeneral"
								onClick={() => {
									// this is where we would begin to expand the styling options, eg have a modal to add in full rgb customization or more theme options that you can make and
									// they can pick from, up to you
									// tbh the logic here is clapped and needs a complete overhaul, im planning on doing this in a later update
									if (document.documentElement.getAttribute('theme') === 'custom') {
										document.documentElement.style = '';
										this.props.changeTheme({
											themeType: 'dark'
										});
										return;
									}

									this.props.changeTheme({
										themeType: this.props.userInfo.themeType === 'light' ? 'dark' : 'light'
									});
									return;
								}}
							>
								toggle theme
							</button>
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
				<Shortcuts editMode={this.props.editMode} />
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
