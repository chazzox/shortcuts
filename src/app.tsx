import React from 'react';
import { useSelector } from 'react-redux';

import Shortcuts from './routes/shortcuts';
import Tutorial from './components/tutorial';

import { RootState } from './redux/store';
import { Route, Switch } from 'react-router-dom';
import Settings from './routes/settings';

const App = () => {
	const isNewUser = useSelector((state: RootState) => state.settings.isNewUser);

	return (
		<>
			{isNewUser ? (
				<Tutorial />
			) : (
				<Switch>
					<Route exact path="/">
						<Shortcuts />
					</Route>
					<Route path="/settings">
						<Settings />
					</Route>
				</Switch>
			)}
		</>
	);
};

export default App;
