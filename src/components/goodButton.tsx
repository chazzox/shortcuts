import React from 'react';

import 'stylesheets/componentStyles/goodButton.scss';

interface propTypes {
	text: string;
	type: 'small' | 'medium' | 'big' | 'icon';
	onPress: () => void;
}
const GoodButton: React.FC<propTypes> = ({ text, type, onPress }: propTypes) => {
	return (
		<button onClick={onPress} className={`genButton ${type}`}>
			{text}
		</button>
	);
};

export default GoodButton;
