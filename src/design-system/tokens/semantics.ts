import { Palette } from './primitives';

export const Typography = {
	// Titles
	'token-title-xl': ['22px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
	// Removed LG/MD/XS as per strict rules

	// Body
	'token-body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
	'token-body-md-bold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
	'token-body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
	'token-body-sm-bold': ['12px', { lineHeight: '1.5', fontWeight: '700' }],
};

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
}

export const SemanticColors: SemanticColorTheme = {
	text: {
		primary: Palette.Gray[900],
		secondary: Palette.Gray[600],
		tertiary: Palette.Gray[400],
		inverse: '#ffffff',
	},
	background: {
		canvas: Palette.Gray[50],
		surface: '#ffffff',
		subtle: Palette.Gray[100],
		overlay: 'rgba(0, 0, 0, 0.5)',
	},
	border: {
		default: Palette.Gray[200],
		subtle: Palette.Gray[100],
		focus: Palette.Gray[700],
	},
	icon: {
		default: Palette.Gray[600],
		interactive: Palette.Gray[700],
		subtle: Palette.Gray[400],
	}
};

export const TypeColors = {
	normal: Palette.Type.Normal,
	fire: Palette.Type.Fire,
	water: Palette.Type.Water,
	electric: Palette.Type.Electric,
	grass: Palette.Type.Grass,
	ice: Palette.Type.Ice,
	fighting: Palette.Type.Fighting,
	poison: Palette.Type.Poison,
	ground: Palette.Type.Ground,
	flying: Palette.Type.Flying,
	psychic: Palette.Type.Psychic,
	bug: Palette.Type.Bug,
	rock: Palette.Type.Rock,
	ghost: Palette.Type.Ghost,
	dragon: Palette.Type.Dragon,
	steel: Palette.Type.Steel,
	dark: Palette.Type.Dark,
	fairy: Palette.Type.Fairy,
};
