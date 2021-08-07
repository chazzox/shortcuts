import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import Global from './components/global';
import App from './app';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider
				theme={{
					color: {
						primaryColor: '#1a1c1d',
						primaryColorInv: '#ffffff',
						primaryTextColor: '#ffffff',
						secondaryTextColor: '#8b8b92',
						tertiaryTextColor: '#47474a',
						boxColor: '#2f3438'
					},
					basic: { primaryPadding: 8, secondaryPadding: 6, borderRadius: 14, searchbarWhitespaecHeight: 100 }
				}}
			>
				<Global />
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.register();
