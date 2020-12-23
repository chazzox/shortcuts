import React, { ReactPropTypes } from 'react';

const Center: React.FC = ({ children }) => {
	return (
		<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{children}</span>
	);
};

export default Center;
