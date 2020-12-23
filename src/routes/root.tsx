import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Shortcuts from 'routes/shortcuts';
import Settings from 'routes/settings';

import 'stylesheets/root.scss';

const Root: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact render={() => <Shortcuts />} />
					<Route path="/settings" render={() => <Settings />} />
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default Root;
