// eslint-disable-next-line
import { createGlobalStyle, css } from 'styled-components';

const Global = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
	* {
		font-family: 'Open Sans', sans-serif;
		box-sizing: border-box;
		color: ${(props) => props.theme.color.primaryTextColor};
	}
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props) => props.theme.color.primaryColor};
	}
`;

export default Global;
