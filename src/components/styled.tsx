import { getImage } from '@app/utils';
import styled, { createGlobalStyle, css } from 'styled-components';

const defaultBackground = css`
	background-color: ${(props) => props.theme.colors.primaryBackground};
`;

export const Global = createGlobalStyle<{ isRandomBackground: boolean }>`
	* {
		font-family: 'Nunito', sans-serif;
		box-sizing: border-box;
		color: ${(props) => props.theme.colors.primaryText};
	}
	body {
		margin: 0;
		padding: 0;
		${(props) => (props.isRandomBackground ? randomBackground : defaultBackground)}
	}
	html,
	body,
	#root {
		height: 100%;
	}
`;

const randomBackground = css`
	background-size: cover;
	background: url('${await getImage()}');
`;

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

export const SimpleBox = styled.div`
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	padding: ${(props) => props.theme.basic.paddingSecondary}px;
	border-radius: ${(props) => props.theme.basic.borderRadiusPrimary}px;
	box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
		rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
