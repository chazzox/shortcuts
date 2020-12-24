import React, { useEffect, useRef } from 'react';

import Grid from 'components/grid';
import Navbar from 'components/navbar';

const Shortcuts: React.FC = () => {
	const searchBarRef = useRef(null);
	useEffect(() => searchBarRef?.current.focus(), []);
	return (
		<>
			<Navbar searchRef={searchBarRef} />
			<Grid />
		</>
	);
};
export default Shortcuts;
