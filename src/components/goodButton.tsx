import React from 'react';

import 'stylesheets/componentStyles/goodButton.scss';

interface propTypes {
	text: string;
	type: 'small' | 'medium' | 'big' | 'icon';
	additionalClasses?: string[];
	onPress: () => void;
}
const GoodButton: React.FC<propTypes> = ({ text, type, onPress, additionalClasses }: propTypes) => {
	return (
		<button onClick={onPress} className={`genButton ${type} ${(additionalClasses || []).join(' ')}`}>
			{text}
		</button>
	);
};

export default GoodButton;
