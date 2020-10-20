import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Shortcuts from './shortcuts/';
import Settings from './settings/';

import '../styles/root.scss';

const Root = () => {
	return (
		<>
			<HashRouter>
				<Switch>
					<Route path="/" exact render={() => <Shortcuts />} />
					<Route path="/settings" render={() => <Settings />} />
				</Switch>
			</HashRouter>
		</>
	);
};

export default Root;
