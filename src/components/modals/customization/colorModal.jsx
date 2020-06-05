import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../../redux/store';

import Popup from '../../utils/modalUtils';
import ColorWheel from './colorWheel';
import './preview.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'box-modal-bg-color',
			newColors: {
				'main-bg-color': this.props.userInfo.themeInfo['main-bg-color'].substring(1),
				'nav-bg-color': this.props.userInfo.themeInfo['nav-bg-color'].substring(1),
				'box-modal-bg-color': this.props.userInfo.themeInfo['box-modal-bg-color'].substring(1),
				'main-text-color': this.props.userInfo.themeInfo['main-text-color'].substring(1)
			}
		};
	}

	componentDidMount() {
		document.body.style.setProperty('--preview-box-modal-bg-color', '#' + this.state.newColors['box-modal-bg-color']);
		document.body.style.setProperty('--preview-nav-bg-color', '#' + this.state.newColors['nav-bg-color']);
		document.body.style.setProperty('--preview-main-bg-color', '#' + this.state.newColors['main-bg-color']);
	}

	componentDidUpdate(__, prevState) {
		if (prevState.newColors === this.state.newColors) return;
		else {
			document.body.style.setProperty(
				'--preview-box-modal-bg-color',
				'#' + this.state.newColors['box-modal-bg-color']
			);
			document.body.style.setProperty('--preview-nav-bg-color', '#' + this.state.newColors['nav-bg-color']);
			document.body.style.setProperty('--preview-main-bg-color', '#' + this.state.newColors['main-bg-color']);
		}
	}

	editColors(hexColor) {
		this.setState({
			newColors: {
				...this.state.newColors,
				[this.state.selected]: hexColor
			}
		});
	}

	getColor(selected) {
		return this.state.newColors['--preview-' + selected];
	}

	save() {
		this.props.changeTheme({ newInfo: { ...this.props.userInfo, themeInfo: this.state.newColors } });
		this.props.close();
	}

	render() {
		return (
			<Popup>
				<div id="title" className="boxContainer">
					change the colors of your homepage
				</div>
				<div className={'container'}>
					<ColorWheel colorChange={(hex) => this.editColors(hex)} color={this.state.newColors['main-bg-color']} />
					<div className="colorModals boxContainer">
						<h1>preview new colours</h1>
						<p>click on the area of the website you would like to change the color of</p>
						<p>currently selected: {!(this.state.selected === '') ? this.state.selected : 'nothing'}</p>
						<PreviewChanges
							selectedObject={(name) => this.setState({ selected: name, tempColor: this.getColor(name) })}
						/>
					</div>
				</div>
				<div style={{ textAlign: 'center' }}>
					<div
						style={{ width: 'max-content', margin: 'auto', display: 'inline-block' }}
						className={'buttonGeneral'}
						onClick={() => this.props.close()}
					>
						close
					</div>
					<div
						style={{ width: 'max-content', margin: 'auto', display: 'inline-block' }}
						className={'buttonGeneral'}
						onClick={() => this.save()}
					>
						save the changes
					</div>
				</div>
			</Popup>
		);
	}
}

class PreviewChanges extends React.Component {
	constructor(props) {
		super(props);
		this.state = { boxPress: true, navPress: false, backgroundPress: false };
	}

	handleClick(pointer, name) {
		this.setState(
			{ backgroundPress: false, boxPress: false, navPress: false, [pointer]: true },
			this.props.selectedObject(name)
		);
	}

	boxPress(e) {
		e.stopPropagation();
		this.handleClick('boxPress', 'box-modal-bg-color');
	}

	render() {
		return (
			<>
				<div
					className="wrapper"
					style={
						this.state.backgroundPress
							? { padding: '12px', marginBottom: '12px', border: '2px solid white' }
							: null
					}
					id="previewBackground"
					onClick={() => this.handleClick('backgroundPress', 'main-bg-color')}
				>
					<div
						style={this.state.navPress ? { marginBottom: '15px', border: '2px solid white' } : null}
						onClick={(e) => {
							e.stopPropagation();
							this.handleClick('navPress', 'nav-bg-color');
						}}
						className="previewNav"
					>
						<span>shortcuts</span>
					</div>
					<div className="previewContainer">
						<div className="previewColumn">
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
						</div>
						<div className="previewColumn">
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
						</div>
						<div className="previewColumn">
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
						</div>
						<div className="previewColumn">
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
							<Box enlarge={this.state.boxPress} newPress={(e) => this.boxPress(e)} />
						</div>
					</div>
				</div>
				<div id="textPreviews">
					<p>primary text</p>
					<p>secondary text</p>
				</div>
			</>
		);
	}
}

class Box extends React.Component {
	render() {
		return (
			<div
				onClick={(e) => this.props.newPress(e)}
				style={
					this.props.enlarge
						? { transform: 'scale(1.1, 1)', paddingBottom: '5px', border: '2px solid white' }
						: null
				}
				className="previewBox"
			/>
		);
	}
}

// linking global values
const mapStateToProps = (state) => {
	return {
		userInfo: state.userSlice.userInfo
	};
};

// linking update functions
const mapDispatchToProps = () => {
	return {
		changeTheme
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
