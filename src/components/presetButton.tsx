import React from 'react';

import 'stylesheets/componentStyles/presetButton.scss';

interface PresetButtonProps {
	imgProp?: string;
	title: string;
	isSelected: boolean;
	onPress: () => void;
}

const PresetButton: React.FC<PresetButtonProps> = ({ imgProp, title, isSelected, onPress }: PresetButtonProps) => {
	return (
		<div className={`presetButton ${isSelected && 'selected'}`} onClick={onPress}>
			<img src={imgProp} alt="" height={120} />
			<span>{title}</span>
		</div>
	);
};

export default PresetButton;
