import React from 'react';
import type { AppDispatch, RootState } from '@app/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { toggleRandBackground } from '@app/redux/settingsReducer';

const Settings = () => {
	const isRandBackgroundEnabled = useSelector((state: RootState) => state.settings.isRandBackgroundEnabled);
	const dispatch = useDispatch<AppDispatch>();
	return (
		<>
			<div>
				<h1>Settings</h1>
			</div>
			<div>
				<div>
					<h1>Colors</h1>
					<h2>Customisation to be written</h2>
				</div>
				<div>
					<h2>Background</h2>
					<div>
						<div>
							This Feature breaks the safari build for some reason, i have disabled it until i figure out why
						</div>
						<p>Enable/Disable the option to pull a random wallpaper from unsplash</p>
						<input
							type="checkbox"
							checked={isRandBackgroundEnabled}
							onChange={() => {
								dispatch(toggleRandBackground());
							}}
						/>
					</div>
				</div>
				<div>
					<h2>Linked Accounts</h2>
					<h3>Widget Accounts to appear hear shortly</h3>
				</div>
				<div>
					<h2>Backup/Import</h2>
					<h3>Upload a new config or download your current one here</h3>
				</div>
				<div>
					<h2>Cookies/Local storage</h2>
					<h3>
						Vew/Delete your stored cookies/Local storage (delting your local storage will remove your config),
						Deleting cookies will mean you will have to login to your connected accounts again (probably)
					</h3>
				</div>
			</div>
		</>
	);
};

export default Settings;
