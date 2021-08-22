import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Modal from 'react-modal';

import Global from './components/global';
import App from './app';
import store, { persistor } from './redux/store';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<HashRouter>
					<ThemeProvider
						theme={{
							colors: {
								primaryBackground: 'rgb(30, 32, 44)',
								secondaryBackground: 'rgb(46, 51, 65)',
								tertiaryBackground: 'rgb(40, 42, 54)',

								primaryAccentBackground: 'rgb(179, 137, 239)',
								secondaryAccentBackground: 'rgb(56, 58, 89)',
								tertiaryAccentBackground: 'rgb(104, 67, 155)',

								primaryText: 'rgb(255, 255, 255)',
								secondaryText: 'rgba(255, 255, 255, 0.66)',
								tertiaryText: 'rgb(100, 107, 132)',

								buttonTextColor: 'rgb(255, 255, 255)',
								borderColor: 'rgb(52, 54, 84)'
							},
							basic: {
								borderRadiusPrimary: 14,
								borderRadiusSecondary: 8,
								paddingPrimary: 8,
								paddingSecondary: 11,
								paddingTertiary: 24,
								whitespaceHeight: 100
							}
						}}>
						<Global />
						<App />
					</ThemeProvider>
				</HashRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

Modal.setAppElement('#root');
