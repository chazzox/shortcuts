import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HashRouter } from 'react-router-dom';
import Modal from 'react-modal';

import App from './app';
import store, { persistor } from './redux/store';

import '@app/assets/style.scss';

const Index = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HashRouter>
					<App />
				</HashRouter>
			</PersistGate>
		</Provider>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));

Modal.setAppElement('#root');
