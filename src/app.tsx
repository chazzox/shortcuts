import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Shortcuts from './routes/shortcuts';
import Tutorial from './components/tutorial';

import type { RootState } from './redux/store';
import Settings from './routes/settings';
import { Global } from './components/styled';
import Navbar from './components/navbar';

const App = () => {
	const isNewUser = useSelector((state: RootState) => state.settings.isNewUser);
	const isRandBackgroundEnabled = useSelector((state: RootState) => state.settings.isRandBackgroundEnabled);

	return (
		<>
			<Global isRandomBackground={isRandBackgroundEnabled} />
			{isNewUser ? (
				<Tutorial />
			) : (
				<>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Shortcuts} />
						<Route path="/settings" component={Settings} />
					</Switch>
				</>
			)}
		</>
	);
};

export default App;
