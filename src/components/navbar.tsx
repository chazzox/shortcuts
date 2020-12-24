import React, { useRef, useState } from 'react';
import { Link } from '@reach/router';

import Settings from 'assets/svgs/controls.svg';

import 'stylesheets/componentStyles/navbar.scss';

interface navBarProps {
	searchRef?: React.MutableRefObject<undefined> | string;
}

const Navbar: React.FC<navBarProps> = ({ searchRef }: navBarProps) => {
	const [searchString, setSearchString] = useState('');
	const searchRefFinal = searchRef || useRef(null);
	const search = () => {};
	return (
		<span id="navbarContainer">
			<div id="navbar">
				<Link to="/" className="nav-item title left">
					Shortcuts
				</Link>
				<input
					ref={searchRefFinal}
					className="nav-item searchBar"
					type="text"
					value={searchString}
					onChange={(event) => setSearchString(event.target.value)}
					onKeyPress={(event) => {
						if ((event.key = 'enter')) search();
					}}
				/>
				{/* <div style={{ backgroundImage: settings }} className="nav-item icon" /> */}
				<Link to="/settings/" className="nav-item icon">
					<Settings height="30px" width="30px" />
				</Link>
			</div>
		</span>
	);
};

export default Navbar;
