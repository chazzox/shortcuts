import React from 'react';
import styled from 'styled-components';

const AddButton = styled.button`
	height: 50px;
	width: 50px;
	border-radius: 25px;
	background: white;
	outline: none;
	transition: width 0.1s ease-in;
	align-self: center;
	border: none;
	cursor: pointer;
	padding: 0;
	&:hover {
		width: 100%;
		& > svg {
			transform: rotate(90deg);
		}
	}
`;

const PlusSvg = styled.svg`
	transition: transform 0.1s ease-in;
	height: 100%;
	background: black;
	& > path {
		fill: white;
	}
`;

const AddNewItem = () => {
	return (
		<AddButton>
			<PlusSvg viewBox="0 0 567.121 567.121">
				<path
					fillRule="evenodd"
					fill="none"
					stroke="none"
					d="M0,567.118h567.121V0.003H0V567.118z M61.843,276.731c0-27.087,21.958-49.045,49.045-49.045h116.8v-116.8
			c0-27.087,21.958-49.046,49.045-49.046h13.661c27.092,0,49.045,21.959,49.045,49.046v116.8H456.24
			c27.086,0,49.045,21.958,49.045,49.045v13.661c0,27.086-21.959,49.045-49.045,49.045H339.434v116.801
			c0,27.086-21.959,49.045-49.045,49.045h-13.661c-27.087,0-49.046-21.959-49.046-49.045V339.437h-116.8
			c-27.087,0-49.046-21.959-49.046-49.045v-13.661H61.843z"
				/>
			</PlusSvg>
		</AddButton>
	);
};

export default AddNewItem;
