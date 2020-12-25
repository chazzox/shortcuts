import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { dispatchType } from 'reduxStore/store';
import { setIsNew } from 'reduxStore/preference';

import PresetButton from 'components/presetButton';
import GoodButton from 'components/goodButton';

import defaultPreset from 'assets/default.png';
import blankPreset from 'assets/blank.png';

import 'stylesheets/routeStyles/tutorial.scss';

const Tutorial: React.FC = () => {
	const [presetType, setPresetType] = useState(false);
	const dispatch: dispatchType = useDispatch();
	return (
		<>
			<div className="center">
				<div id="tutorialBox">
					<h1>Shortcuts - A New Page Replacement</h1>
					<h3>What is this site for?</h3>
					<span>
						Well, when you open a new tab, there is often quite a bit of wasted screen space. When you set this
						set as your homepage you have the option to add different widgets and books marks, if you want you
						can take a look at the widget guide here (to be created). If you're a dev it is also possible to
						create your won widget and submit a pull request to the repo (link to be added) to have it added
					</span>

					<h3>Select preset:</h3>
					<div id="presetContainer">
						<PresetButton
							imgProp={blankPreset}
							isSelected={!presetType}
							title="Blank"
							onPress={() => setPresetType(false)}
						/>
						<PresetButton
							imgProp={defaultPreset}
							isSelected={presetType}
							title="Default"
							onPress={() => setPresetType(true)}
						/>
					</div>
					<GoodButton
						text="Continue"
						type="small"
						onPress={() => {
							Cookies.set('isNew', 'false');
							dispatch(setIsNew(false));
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default Tutorial;
