import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Shortcuts from './components/shortcuts/shortcuts';
import Tutorial from './components/tutorial/tutorial';

import { RootState } from './redux/store';

import './styles/app.scss';
import './styles/darkMode.scss';
import './styles/lightMode.scss';

const App = () => {
	const isDarkMode = useSelector((state: RootState) => state.settings.isDarkMode);
	const isNewUser = useSelector((state: RootState) => state.settings.isNewUser);

	useEffect(() => {
		if (!isDarkMode) document.getElementById('html')?.classList.add('lightMode');
	}, [isDarkMode]);
	return <>{isNewUser ? <Tutorial /> : <Shortcuts />}</>;
};

export default App;
