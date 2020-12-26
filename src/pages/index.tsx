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
	const hasLoaded = useSelector((state: stateType) => state.preferences.hasLoaded);

	useEffect(() => {
		if (doesConfigExist) searchBarRef?.current.focus();
	}, [doesConfigExist]);

	return (
		<>
			{!hasLoaded && <Navbar searchRef={searchBarRef} />}
			{hasLoaded &&
				(doesConfigExist ? (
					<>
						<Navbar searchRef={searchBarRef} />
						<Grid />
					</>
				) : (
					<Tutorial />
				))}
		</>
	);
};
export default Shortcuts;
