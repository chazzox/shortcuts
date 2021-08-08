// eslint-disable-next-line
import { createGlobalStyle, css } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: 'Nunito', sans-serif;
		box-sizing: border-box;
		color: ${(props) => props.theme.color.primaryTextColor};
	}
	body {
		margin: 0;
		padding: 0;
		background-color: #25292e;
	}
`;

export default Global;
