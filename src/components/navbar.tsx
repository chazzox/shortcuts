import * as React from 'react';
import { Link } from 'react-router-dom';
import { toggleDrag } from '@app/redux/settingsReducer';
import { Toggle } from '@app/components/styled';
import { URLregex } from '@app/utils';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@app/redux/store';
import styled from 'styled-components';
import store from '@app/redux/store';

const SearchBar = styled.div`
	width: 100%;
	height: ${(props) => props.theme.basic.whitespaceHeight}px;
	padding: calc(3 * ${(props) => props.theme.basic.paddingPrimary}px) 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: none;
`;

const SearchInput = styled.input`
	width: 100%;
	max-width: 700px;
	font-size: 13pt;
	padding: ${(props) => props.theme.basic.paddingPrimary}px calc(${(props) => props.theme.basic.paddingPrimary}px + 1%);
	outline: none !important;
	border: none !important;
	border-radius: 100em;
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	height: calc(
		${(props) => props.theme.basic.whitespaceHeight}px - (6 * ${(props) => props.theme.basic.paddingPrimary}px)
	);
	&:focus {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground};
	}
`;

const Navbar = () => {
	const dispatch: AppDispatch = store.dispatch;
	const isEditMode = useSelector((state: RootState) => state.settings.isEditMode);

	const [searchString, updateSearchString] = React.useState('');

	return (
		<SearchBar>
			<SearchInput
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
			<Toggle
				type="checkbox"
				checked={isEditMode}
				onChange={() => {
					dispatch(toggleDrag());
				}}
			/>
			<Link to="/settings">Settings</Link>
		</SearchBar>
	);
};

export default Navbar;
