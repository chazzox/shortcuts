import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import * as serviceWorker from './serviceWorker';

class Main extends Component {
	render() {
		return (
			<React.StrictMode>
				<div className='App'>
					<header className='App-header'>
						<img src={logo} className='App-logo' alt='logo' />
						<p>
							are we gaming?
						</p>
					</header>
				</div>
			</React.StrictMode> 
		);
	}
}

ReactDOM.render(<Main/>, document.getElementById('root'));

// optimises render workflow (caching)
serviceWorker.register();
