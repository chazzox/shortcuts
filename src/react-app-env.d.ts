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
		};
		basic: { borderRadius: number; primaryPadding: number; secondaryPadding: number };
	}
}
