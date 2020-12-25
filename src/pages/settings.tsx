import React from 'react';

import Navbar from 'components/navbar';

import 'stylesheets/routeStyles/settings.scss';

const Settings = () => {
	return (
		<>
			<Navbar />
			<div className="pageTitle">
				<h1>Settings</h1>
			</div>
			<div className="settingsBoxContainer">
				<div className="setting">
					<span className="settingBoxTitle">Colors</span>
					<div className="settingBoxContent">Customisation to be written</div>
				</div>
				<div className="setting">
					<span className="settingBoxTitle">Linked Accounts</span>
					<div className="settingBoxContent">Widget Accounts to appear hear shortly</div>
				</div>
				<div className="setting">
					<span className="settingBoxTitle">Backup/Import</span>
					<div className="settingBoxContent">Upload a new config or download your current one here</div>
				</div>
				<div className="setting">
					<span className="settingBoxTitle">Cookies/Local storage</span>
					<div className="settingBoxContent">
						Vew/Deleted your stored cookies/Local storage (delting your local storage will remove your config)
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
