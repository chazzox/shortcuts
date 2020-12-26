import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { stateType } from 'reduxStore/store';

import Grid from 'components/grid';
import Navbar from 'components/navbar';
import Tutorial from 'components/tutorial';

import 'stylesheets/root.scss';
import 'stylesheets/variables.scss';

const Shortcuts: React.FC = () => {
	const searchBarRef = useRef(null);
	const isNewUser = useSelector((state: stateType) => state.preferences.isNew);
	useEffect(() => {
		if (!isNewUser) searchBarRef?.current.focus();
	}, []);
	return (
		<>
			{isNewUser ? (
				<>
					<Tutorial />
				</>
			) : (
				<>
					<Navbar searchRef={searchBarRef} />
					<Grid />
				</>
			)}
		</>
	);
};
export default Shortcuts;
