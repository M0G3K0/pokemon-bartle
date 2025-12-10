import { Gray, White } from './primitives';

export interface SemanticColorTheme {
	text: {
		primary: string;
		secondary: string;
		tertiary: string;
		inverse: string;
	};
	background: {
		canvas: string;
		surface: string;
		subtle: string;
		overlay: string;
	};
	border: {
		default: string;
		subtle: string;
		focus: string;
	};
	icon: {
		default: string;
		interactive: string;
		subtle: string;
	};
	action: {
		primary: {
			default: string;
			hover: string;
			active: string;
			foreground: string;
		};
		secondary: {
			default: string;
			hover: string;
			active: string;
			foreground: string;
		};
		ghost: {
			hover: string;
			active: string;
			foreground: string;
		};
		outline: {
			hover: string;
			active: string;
			border: string;
			foreground: string;
		};
	};
}

export const SemanticColors: SemanticColorTheme = {
	text: {
		primary: Gray[900],
		secondary: Gray[600],
		tertiary: Gray[400],
		inverse: White,
	},
	background: {
		canvas: Gray[50],
		surface: White,
		subtle: Gray[100],
		overlay: 'rgba(0, 0, 0, 0.5)',
	},
	border: {
		default: Gray[200],
		subtle: Gray[100],
		focus: Gray[700],
	},
	icon: {
		default: Gray[600],
		interactive: Gray[700],
		subtle: Gray[400],
	},
	action: {
		primary: {
			default: Gray[800],
			hover: Gray[700],
			active: Gray[900],
			foreground: White
		},
		secondary: {
			default: Gray[200],
			hover: Gray[300],
			active: Gray[400],
			foreground: Gray[800]
		},
		ghost: {
			hover: Gray[100],
			active: Gray[200],
			foreground: Gray[600] // secondary text
		},
		outline: {
			hover: Gray[100],
			active: Gray[200],
			border: Gray[200], // default border
			foreground: Gray[400] // tertiary text
		}
	}
};
