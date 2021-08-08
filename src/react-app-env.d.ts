/// <reference types="react-scripts" />
import 'styled-components';

// extending styled components default theme
declare module 'styled-components' {
	export interface DefaultTheme {
		color: {
			primaryColor: string;
			primaryColorInv: string;
			primaryTextColor: string;
			secondaryTextColor: string;
			tertiaryTextColor: string;
			boxColor: string;
			darkText: string;
		};
		basic: {
			borderRadius: number;
			primaryPadding: number;
			secondaryPadding: number;
			searchbarWhitespaecHeight: number;
		};
	}
}
