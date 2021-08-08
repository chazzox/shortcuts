import React from 'react';
import styled from 'styled-components';

import Plus from '../assets/plus.png';

const AddButton = styled.button`
	height: 50px;
	width: 50px;
	border-radius: 25px;
	background: white;
	transition: width 0.1s ease-in;
	border: none;
	cursor: pointer;
	padding: 0;
	align-self: center;
	display: flex;
	justify-content: center;
	&:hover {
		width: 100%;
		& > img {
			transform: rotate(90deg);
		}
	}
`;

const PlusPng = styled.img`
	transition: transform 0.1s ease-in;
	height: 80%;
	align-self: center;
`;

const AddNewItem = () => {
	return (
		<AddButton>
			<PlusPng src={Plus} />
		</AddButton>
	);
};

export default AddNewItem;
