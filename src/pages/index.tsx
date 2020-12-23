import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stateType } from '../reduxStore/store';

import Root from 'routes/root';
import Tutorial from 'routes/tutorial/tutorial';

const IndexPage = () => {
	const isNewUser = useSelector((state: stateType) => state.preferences.isNew);
	return <>{isNewUser ? <Tutorial /> : <Root />}</>;
};

export default IndexPage;
