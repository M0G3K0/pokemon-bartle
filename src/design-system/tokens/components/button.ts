import { SemanticColors } from '../color/semantics';
import { Transparent } from '../color/primitives';

export const ButtonTokens = {
	primary: {
		bg: SemanticColors.action.primary.default,
		text: SemanticColors.action.primary.foreground,
		hover: SemanticColors.action.primary.hover,
		active: SemanticColors.action.primary.active
	},
	secondary: {
		bg: SemanticColors.action.secondary.default,
		text: SemanticColors.action.secondary.foreground,
		hover: SemanticColors.action.secondary.hover,
		active: SemanticColors.action.secondary.active
	},
	ghost: {
		bg: Transparent,
		text: SemanticColors.action.ghost.foreground,
		hover: SemanticColors.action.ghost.hover,
		active: SemanticColors.action.ghost.active
	},
	outline: {
		bg: Transparent,
		text: SemanticColors.action.outline.foreground,
		border: SemanticColors.action.outline.border,
		hover: SemanticColors.action.outline.hover,
		active: SemanticColors.action.outline.active
	},
	icon: {
		bg: Transparent,
		text: SemanticColors.icon.default,
		hover: SemanticColors.action.ghost.hover,
		active: SemanticColors.action.ghost.active
	}
};
