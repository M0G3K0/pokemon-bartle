export const TypographyScale = {
	// Titles
	'token-title-l': ['22px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
	'token-title-m': ['18px', { lineHeight: '1.4', fontWeight: '700' }],
	'token-title-s': ['16px', { lineHeight: '1.4', fontWeight: '700' }],
	// Removed LG/MD/XS as per strict rules

	// Body
	'token-body-md': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
	'token-body-md-bold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
	'token-body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
	'token-body-sm-bold': ['12px', { lineHeight: '1.5', fontWeight: '700' }],
} as const;
