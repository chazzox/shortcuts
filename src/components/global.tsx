// eslint-disable-next-line
import { createGlobalStyle, css } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: 'Nunito', sans-serif;
		box-sizing: border-box;
		color: ${(props) => props.theme.colors.primaryText};
	}
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props) => props.theme.colors.primaryBackground};;
	}
`;

export default Global;
