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
	const doesConfigExist = useSelector((state: stateType) => state.preferences.doesConfigExist);
	useEffect(() => {
		if (doesConfigExist) searchBarRef?.current.focus();
	}, [doesConfigExist]);
	return (
		<>
			{!doesConfigExist ? (
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
