// eslint-disable-next-line
import * as styled from 'styled-components';

const Global = styled.createGlobalStyle`
	* {
		font-family: 'Nunito', sans-serif;
		box-sizing: border-box;
		color: ${(props) => props.theme.colors.primaryText};
	}
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props) => props.theme.colors.primaryBackground};
	}
	html,
	body,
	#root {
		height: 100%;
	}
`;

export default Global;
