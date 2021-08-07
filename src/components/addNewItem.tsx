import React from 'react';
import styled from 'styled-components';

const AddButton = styled.button`
	height: 45px;
	width: 45px;
	border-radius: 50%;
	outline: none;
`;

const AddNewItem = () => {
	return <AddButton>X</AddButton>;
};
export default AddNewItem;
