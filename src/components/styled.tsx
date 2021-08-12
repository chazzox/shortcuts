import styled from 'styled-components';

export const Button = styled.button`
	background-color: ${(props) => props.theme.colors.primaryAccentBackground};
	border: none;
	color: ${(props) => props.theme.colors.buttonTextColor};
	font-size: 15px;
	padding: 5px;
	border-radius: 8px;
	transition: background-color, color 0.2s ease;
	cursor: pointer;
	margin: 5px;
	&:hover {
		background-color: ${(props) => props.theme.colors.buttonTextColor};
		color: black;
	}
`;

export const Toggle = styled.input`
	display: inline-block;
	height: 32px;
	width: 52px;
	border-radius: 15px;
	position: relative;
	margin: 0;
	border: 2px solid #474755;
	transition: all 0.2s ease;
	&:after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: white;
		box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
		transition: all 0.3s ease;
	}
	&:checked {
		border-color: white;
	}
	&:checked:after {
		transform: translatex(20px);
	}

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	-webkit-tap-highlight-color: transparent;
	cursor: pointer;
	&:focus {
		outline: 0;
	}
`;

export const ItemTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	& > * {
		margin: 5px;
	}
`;
