import React from 'react';

import Color from './customization/colorModal';

export default class Settings extends React.Component {
	render() {
		return (
			<span id="settingsContainer">
				<div className="setting">
					<div className="settingTitle">colors</div>
					<Color />
				</div>
			</span>
		);
	}
}
