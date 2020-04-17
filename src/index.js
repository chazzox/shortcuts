import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';

import App from './App';
import store from './redux/store';
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        {/* we don't render the component in here as is depends on the state of the reducer */}
        <App />
    </Provider>,
    document.getElementById('root')
);
