import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Shortcuts from './routes/shortcuts';
import Tutorial from './components/tutorial';

import type { RootState } from './redux/store';
import Settings from './routes/settings';

const App = () => {
	const isNewUser = useSelector((state: RootState) => state.settings.isNewUser);
	const isRandBackgroundEnabled = useSelector((state: RootState) => state.settings.isRandBackgroundEnabled);

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
