import React, { useEffect, useRef, useState } from 'react';
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
	const hasLoaded = useState(false);

	useEffect(() => {
		if (doesConfigExist) searchBarRef?.current.focus();
	}, [doesConfigExist]);

	if (hasLoaded && doesConfigExist) {
		return (
			<>
				<Navbar searchRef={searchBarRef} />
				<Grid />
			</>
		);
	}

	return <Tutorial />;
};
export default Shortcuts;
