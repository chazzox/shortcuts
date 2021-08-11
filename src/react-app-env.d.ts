/// <reference types="react-scripts" />
import 'styled-components';

// extending styled components default theme
declare module 'styled-components' {
	export interface DefaultTheme {
		colors: ColorTheme;
		basic: BasicValues;
	}
}

export interface ColorTheme {
	primaryBackground: string;
	secondaryBackground: string;
	tertiaryBackground: string;

	primaryAccentBackground: string;
	secondaryAccentBackground: string;
	tertiaryAccentBackground: string;

	primaryText: string;
	secondaryText: string;
	tertiaryText: string;

	buttonTextColor: string;
	borderColor: string;

	sidebarPrimaryColor?: string;
}

export interface BasicValues {
	borderRadiusPrimary: number;
	borderRadiusSecondary: number;

	paddingPrimary: number;
	paddingSecondary: number;
	paddingTertiary: number;
	whitespaceHeight: number;
}
