import React, { useRef, useState } from 'react';
import { Link } from 'gatsby';
import Cookies from 'js-cookie';

import GoodButton from 'components/goodButton';
import Settings from 'assets/svgs/controls.svg';
import validate from 'utils/validation';

import 'stylesheets/componentStyles/navbar.scss';

interface navBarProps {
	searchRef?: React.MutableRefObject<undefined> | string;
}

const Navbar: React.FC<navBarProps> = ({ searchRef }: navBarProps) => {
	const [searchString, setSearchString] = useState('');
	const searchRefFinal = searchRef || useRef(null);
	const search = () => {
		if (validate.isURL([searchString])) {
			window.location.href = searchString;
		} else {
			window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(searchString);
		}
	};
	return (
		<main id="navbarContainer">
			<main id="navbar">
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
						if (event.key === 'Enter') search();
					}}
				/>
				<GoodButton
					text="clear"
					type="medium"
					additionalClasses={['nav-item']}
					onPress={() =>
						Object.keys(Cookies.get()).forEach(function (cookieName) {
							Cookies.remove(cookieName);
						})
					}
				/>
				<Link to="settings/" className="nav-item icon">
					<Settings height="30px" width="30px" />
				</Link>
			</main>
		</main>
	);
};

export default Navbar;
