import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { stateType } from 'reduxStore/store';
import { navigate } from '@reach/router';

import Grid from 'components/grid';
import Navbar from 'components/navbar';

import 'stylesheets/root.scss';
import 'stylesheets/variables.scss';

const Shortcuts: React.FC = () => {
	const searchBarRef = useRef(null);
	const isNewUser = useSelector((state: stateType) => state.preferences.isNew);
	useEffect(() => {
		if (isNewUser) navigate('/tutorial');
		searchBarRef?.current.focus();
	}, []);
	return (
		<>
			<Navbar searchRef={searchBarRef} />
			<Grid />
		</>
	);
};
export default Shortcuts;
