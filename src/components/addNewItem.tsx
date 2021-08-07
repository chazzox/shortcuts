import React from 'react';
import styled from 'styled-components';

const AddButton = styled.button`
	height: 50px;
	width: 50px;
	border-radius: 25px;
	outline: none;
	transition: width 0.1s ease-in;
	align-self: center;
	border: none;
	cursor: pointer;
	&:hover {
		width: 100%;
	}
`;

const AddNewItem = () => {
	return <AddButton>X</AddButton>;
};

export default AddNewItem;
