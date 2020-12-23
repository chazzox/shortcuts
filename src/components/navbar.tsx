import React, { useState } from 'react';

import 'stylesheets/componentStyles/navbar.scss';

const Navbar: React.FC = () => {
	const [searchString, setSearchString] = useState('');
	return (
		<span id="navbarContainer">
			<div id="navbar">
				<span className="nav-item title left">Shortcuts</span>
				<input
					className="nav-item searchBar"
					type="text"
					value={searchString}
					onChange={(event) => setSearchString(event.target.value)}
				/>
				<span className="nav-item right">Settings</span>
			</div>
		</span>
	);
};

export default Navbar;
