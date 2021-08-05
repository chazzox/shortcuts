import styled from 'styled-components';

export const Button = styled.button`
	background-color: ${(props) => props.theme.color.primaryColor};
	border: none;
	color: white;
	font-size: 15px;
	padding: 5px;
	border-radius: 8px;
	&:hover {
		background-color: ${(props) => props.theme.color.primaryColorInv};
		color: black;
	}
`;
