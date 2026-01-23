const designConsistencyRules = require("./guards/design/rules/design-consistency.rules");

module.exports = {
	extends: ["stylelint-config-standard-scss"],
	rules: {
		...designConsistencyRules,
		"selector-pseudo-element-no-unknown": [
			true,
			{
				// See: guards/design/guard/design-consistency.guard.md#例外と理由
				ignorePseudoElements: ["ng-deep"], // Angular固有
			},
		],
	},
	overrides: [
		{
			// See: guards/design/guard/design-consistency.guard.md#例外と理由
			files: ["src/styles/tokens/**/*.scss", "src/design-system/**/*.scss"],
			rules: {
				"color-no-hex": null,
				"color-named": null,
			},
		},
	],
	ignoreFiles: ["dist/**/*", "node_modules/**/*", "coverage/**/*"],
};
