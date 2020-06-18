import React from 'react';
import { connect } from 'react-redux';
import { changeTheme } from '../../../redux/store';

import Popup from '../../utils/modalUtils';
import ColorWheel from './colorWheel';
import './preview.scss';

// this is a rather rudimentary color picker, we could add a theme browser and improve the general css of the modal,
// i could also provide a complete separate settings page to bundle this is into, instead of having modals, this would be a
// big update, but could be nicer looking

class App extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.themeInfo);
		this.state = {
			selected: 'box-modal-bg-color',
			newColors: {
				'main-bg-color': this.props.themeInfo['main-bg-color'],
				'nav-bg-color': this.props.themeInfo['nav-bg-color'],
				'box-modal-bg-color': this.props.themeInfo['box-modal-bg-color'],
				'main-text-color': this.props.themeInfo['main-text-color']
			}
		};
	}

	componentDidMount() {
		// this sets the preview colors equal to the current themes
		document.body.style.setProperty('--preview-box-modal-bg-color', '#' + this.props.themeInfo['box-modal-bg-color']);
		document.body.style.setProperty('--preview-nav-bg-color', '#' + this.props.themeInfo['nav-bg-color']);
		document.body.style.setProperty('--preview-main-bg-color', '#' + this.props.themeInfo['main-bg-color']);
	}

	// this sets the preview colors equal to the current themes when it updates
	componentDidUpdate(__, prevState) {
		if (prevState.newColors !== this.state.newColors) {
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

	// this saves a 
	save(colors) {
		this.props.changeTheme({ themeInfo: colors });
		this.props.close();
	}

	render() {
		return (
			<Popup>
				<div id="title" className="boxContainer">
					change the colors of your homepage
				</div>
				<div className={'container'}>
					<ColorWheel
						colorChange={(hex) => this.editColors(hex)}
						color={this.props.themeInfo['box-modal-bg-color']}
					/>
					<div className="colorModals boxContainer">
						<h1>preview new colours</h1>
						<p>click on the area of the website you would like to change the color of</p>
						<p>currently selected: {!(this.state.selected === '') ? this.state.selected : 'nothing'}</p>
						<PreviewChanges
							selectedObject={(name) => this.setState({ selected: name, tempColor: this.getColor(name) })}
							light={() =>
								this.save({
									'main-bg-color': 'f0eff5ff',
									'nav-bg-color': 'd8d8d8ff',
									'box-modal-bg-color': 'ffffffff',
									'main-text-color': '000000ff',
									'secondary-font-color': '000000ff'
								})
							}
							dark={() =>
								this.save({
									'main-bg-color': '292c30ff',
									'nav-bg-color': '000000ff',
									'box-modal-bg-color': '2f3439ff',
									'main-text-color': 'ffffffff',
									'secondary-font-color': '000000ff'
								})
							}
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
						onClick={() => this.save(this.state.newColors)}
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
				<p>pre-made themes</p>
				<div className={'buttonGeneral'} onClick={() => this.props.light()}>
					light mode
				</div>
				<div className={'buttonGeneral'} onClick={() => this.props.dark()}>
					dark mode
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
		themeInfo: state.userSlice.themeInfo
	};
};

// linking update functions
const mapDispatchToProps = () => {
	return {
		changeTheme
	};
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
