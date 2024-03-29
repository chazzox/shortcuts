import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { SimpleBox, Toggle } from '@app/components/styled';
import type { AppDispatch, RootState } from '@app/redux/store';
import { toggleRandBackground } from '@app/redux/settingsReducer';

const PageTitle = styled.div`
	display: flex;
	justify-content: center;
	& > h1 {
		color: ${(props) => props.theme.colors.primaryText};
	}
`;

const SettingsBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-flow: wrap;
	justify-content: space-evenly;
`;

const Setting = styled(SimpleBox)`
	margin: 10px;
	flex: 0 1 560px;
	height: calc(100vh * 0.25);
	display: flex;
	flex-direction: column;
	margin: 25px;
`;

const SettingBoxTitle = styled.span`
	text-align: center;
	font-size: 20px;
	font-weight: 600;
`;

const SettingBoxContent = styled.div`
	padding: 15px;
`;

const Settings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isRandBackgroundEnabled = useSelector((state: RootState) => state.settings.isRandBackgroundEnabled);

	return (
		<>
			<PageTitle>
				<h1>Settings</h1>
			</PageTitle>
			<SettingsBoxContainer>
				<Setting>
					<SettingBoxTitle>Colors</SettingBoxTitle>
					<SettingBoxContent>Customisation to be written</SettingBoxContent>
				</Setting>
				<Setting>
					<SettingBoxTitle>Background</SettingBoxTitle>
					<SettingBoxContent>
						<Error>
							This Feature breaks the safari build for some reason, i have disabled it until i figure out why
						</Error>
						<p>Enable/Disable the option to pull a random wallpaper from unsplash</p>
						<Toggle
							type="checkbox"
							checked={isRandBackgroundEnabled}
							onChange={() => {
								dispatch(toggleRandBackground());
							}}
						/>
					</SettingBoxContent>
				</Setting>
				<Setting>
					<SettingBoxTitle>Linked Accounts</SettingBoxTitle>
					<SettingBoxContent>Widget Accounts to appear hear shortly</SettingBoxContent>
				</Setting>
				<Setting>
					<SettingBoxTitle>Backup/Import</SettingBoxTitle>
					<SettingBoxContent>Upload a new config or download your current one here</SettingBoxContent>
				</Setting>
				<Setting>
					<SettingBoxTitle>Cookies/Local storage</SettingBoxTitle>
					<SettingBoxContent>
						Vew/Delete your stored cookies/Local storage (delting your local storage will remove your config),
						Deleting cookies will mean you will have to login to your connected accounts again (probably)
					</SettingBoxContent>
				</Setting>
			</SettingsBoxContainer>
		</>
	);
};

// Temporary Component
const Error = styled.div`
	background-color: #c02c2c;
	border-radius: 8px;
	padding: 8px;
`;

export default Settings;
