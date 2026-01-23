// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

/** @type {import("eslint").Linter.RulesRecord} */
const codingStandardsRules = require("./guards/code-quality/rules/coding-standards.rules");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      ...codingStandardsRules,
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "pb",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: ["element", "attribute"],
          prefix: "pb",
          style: "kebab-case",
        },
      ],
    },
  },
  // 特定のファイルに対するルール無効化
  {
    // See: guards/code-quality/guard/coding-standards.guard.md#例外と理由
    files: ["**/*.spec.ts", "src/design-system/**", "src/styles/**"],
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      // ディレクティブベースのコンポーネントがコンテンツを動的に生成するため無効化
      "@angular-eslint/template/elements-content": "off",
      // ディレクティブベースのコンポーネントがhostバインディングでclickを使用するため無効化
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  }
]);
