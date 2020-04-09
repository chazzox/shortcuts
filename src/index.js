// React Modules
import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
/// ofline caching service
import * as serviceWorker from './serviceWorker';
/// our modules
import './index.scss';
import { example } from './example';

class Main extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { userJSON: this.props.userJSON, config: this.props.userJSON.config, columns: 'lol', editMode: false };
	}
	renderColumns(editState) {
		return this.state.config.map((column, index) => {
			return <Column key={index} column={column} editMode={editState} />;
		});
	}
	render() {
		return (
			<div className='App'>
				<div className='nav'>
					{this.state.editMode ? (
						<div className='editNav'>
							<h1 className='navTitle'>SHORTCUTS - Edit Time</h1>
							<button
								className='confirmButton editButton' 
								onClick={() => {
									this.setState({ editMode: !this.state.editMode });
								}}>
								save changes
							</button>
						</div>
					) : (
						<div className='normalNav'>
							<h1 className='navTitle'>SHORTCUTS</h1>
							<div className='navIconContainer'>
								<h1 className='yeah'>made for gamers, by gamers</h1>
								<button
									className='editButton'
									onClick={() => {
										this.setState({ editMode: !this.state.editMode });
									}}>
									edit
								</button>
							</div>
						</div>
					)}
				</div>
				<div className='wrapper'>{this.renderColumns(this.state.editMode)}</div>
			</div>
		);
	}
}

class Column extends Component {
	constructor(props) {
		super(props);
		this.state = { column: this.props.column, boxArr: '', editMode: this.props.editMode };
	}
	renderBox() {
		return this.state.column.map((box, index) => {
			return <Box key={index} box={box} editMode={this.state.editMode} />;
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ editMode: nextProps.editMode });
	}
	render() {
		// return <div><h1>yeah</h1></div>;
		return <div className='column'>{this.renderBox()}</div>;
	}
}

class Box extends Component {
	constructor(props) {
		super(props);
		this.state = { box: this.props.box, content: '', editMode: this.props.editMode };
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ editMode: nextProps.editMode });
	}
	componentDidMount() {
		if (this.state.box.type === 'links') {
			this.setState({ content: this.renderLinks() });
		} else if (this.state.box.type === 'widget') {
			switch (this.state.box.widgetType) {
				case 'weather':
					this.setState({ content: <WeatherWidget /> });
					break;

				default:
					this.setState({ content: <WeatherWidget /> });
					break;
			}
		}
	}

	renderLinks() {
		return this.state.box.linkArr.map((link, index) => {
			return <Link key={index} link={link} editMode={this.state.editMode} />;
		});
	}
	render() {
		return (
			<div>
				<h1 className='boxName'>
					{this.state.box.boxName}
					{this.state.editMode ? ' - edit mode' : null}
				</h1>
				<div className='box'>{this.state.content}</div>
			</div>
		);
	}
}

class WeatherWidget extends Component {
	constructor(props) {
		super(props);
		this.state = { type: this.props.type, links: '' };
	}
	render() {
		return <h1 className='linkName'>weather, init mate</h1>;
	}
}

class Link extends Component {
	constructor(props) {
		super(props);
		this.state = { name: this.props.link.name, url: this.props.link.url };
	}
	cleanupURL(url) {
		url = url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
		return url;
	}
	render() {
		return (
			<a href={this.state.url} style={{ textDecoration: 'none' }}>
				<div className='link'>
					<h1 className='linkName'>{this.state.name}</h1>
					{/* <h2 className='linkURL'>{this.cleanupURL(this.state.url)}</h2> */}
				</div>
			</a>
		);
	}
}

// attaching our react system to the div of id='root' in ~/public/index.html
ReactDOM.render(<Main userJSON={example} />, document.getElementById('root'));
// optimises render workflow (caching to device)
serviceWorker.register();
