import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from './App';
import store from './redux/store';
import './index.scss';

ReactDOM.render(
	// provider is what allows us to connect the redux store to all of the components
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
