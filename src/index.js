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
		this.state = { userJSON: this.props.userJSON, config: this.props.userJSON.config, columns: 'lol' };
	}
	renderColumns() {
		return this.state.config.map((column, index) => {
			return <Column key={index} index={index} column={column} />;
		});
	}
	componentDidMount() {
		if (this.state.userJSON !== undefined) {
			this.setState({ columns: this.renderColumns() });
		}
	}
	render() {
		return (
			<React.StrictMode>
				<div className='App'>
					<CustomHeader />
					<div className='wrapper'>{this.state.columns}</div>
				</div>
			</React.StrictMode>
		);
	}
}
class CustomHeader extends Component {
	render() {
		return (
			<div className='App-header'>
				<h1>SHORTCUTS</h1>
				<h1 className='yeah'>made for gamers, by gamers</h1>
			</div>
		);
	}
}

class Column extends Component {
	constructor(props) {
		console.log(props);
		super(props);
		this.state = { column: this.props.column, boxArr: '' };
		// this.links = this.renderLinkList()
	}
	renderBox() {
		return this.state.column.map((box, index) => {
			return <Box key={index} box={box} />;
		});
	}
	componentDidMount() {
		this.setState({ boxArr: this.renderBox() });
	}
	render() {
		// return <div><h1>yeah</h1></div>;
		return <div className='column'>{this.state.boxArr}</div>;
	}
}

class Box extends Component {
	constructor(props) {
		super(props);
		this.state = { box: this.props.box, content: '' };
	}
	componentDidMount() {
		console.log(this.state.box);
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
			return <Link key={index} link={link} />;
		});
	}
	render() {
		return (
			<div>
				<h1 className='boxName'>{this.state.box.boxName}</h1>
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
			<div className='link'>
				<h1 className='linkName'>{this.state.name}</h1>
				{/* <h2 className='linkURL'>{this.cleanupURL(this.state.url)}</h2> */}
			</div>
		);
	}
}

// attaching our react system to the div of id='root' in ~/public/index.html
ReactDOM.render(<Main userJSON={example} />, document.getElementById('root'));
// optimises render workflow (caching to device)
serviceWorker.register();
