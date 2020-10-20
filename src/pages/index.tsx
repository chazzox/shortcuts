import React from 'react';

import Root from '../routes/root';
import Tutorial from '../routes/tutorial/tutorial';

const IndexPage = () => {
	const isNewUser = false;
	return <>{isNewUser ? <Tutorial /> : <Root />}</>;
};

export default IndexPage;
