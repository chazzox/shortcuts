import { toggleDrag } from '@app/redux/settingsReducer';
import type { AppDispatch, RootState } from '@app/redux/store';
import store from '@app/redux/store';
import { URLregex } from '@app/utils';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
	const dispatch: AppDispatch = store.dispatch;
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);
	const [searchString, updateSearchString] = React.useState('');

	return (
		<div id="navbar">
			<Link to="/">Home</Link>
			<input
				type="text"
				value={searchString}
				onChange={(event) => updateSearchString(event.target.value)}
				placeholder="Search..."
				onKeyPress={({ key }) => {
					if (key === 'Enter') {
						let url;
						if (URLregex.test(searchString)) {
							url = new URL(searchString);
						} else {
							url = new URL('https://www.google.com/search');
							url.searchParams.append('q', searchString);
						}
						window.location.href = url.toString();
					}
				}}
			/>
			<input
				type="checkbox"
				checked={isEditMode}
				onChange={() => {
					dispatch(toggleDrag());
				}}
			/>
			<Link to="/settings">Settings</Link>
		</div>
	);
};

export default Navbar;
