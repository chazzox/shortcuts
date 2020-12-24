import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Settings from 'assets/svgs/controls.svg';

import 'stylesheets/componentStyles/navbar.scss';

interface navBarProps {
	searchRef: React.MutableRefObject<undefined>;
}

const Navbar: React.FC<navBarProps> = ({ searchRef }: navBarProps) => {
	const [searchString, setSearchString] = useState('');
	return (
		<span id="navbarContainer">
			<div id="navbar">
				<Link to="/" className="nav-item title left">
					Shortcuts
				</Link>
				<input
					ref={searchRef}
					className="nav-item searchBar"
					type="text"
					value={searchString}
					onChange={(event) => setSearchString(event.target.value)}
				/>
				{/* <div style={{ backgroundImage: settings }} className="nav-item icon" /> */}
				<Link to="/settings" className="nav-item icon">
					<Settings height="30px" width="30px" />
				</Link>
			</div>
		</span>
	);
};

export default Navbar;
