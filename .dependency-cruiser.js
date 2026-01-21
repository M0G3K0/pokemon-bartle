/**
 * @what  レイヤー境界の依存関係を検査
 * @why   core→features、domain→coreの逆依存を防ぎ、アーキテクチャの崩壊を防止するため
 * @failure  違反があるとdep-cruiserが非0で終了し、CIが失敗する
 */

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
	forbidden: [
		{
			name: "core-cannot-depend-on-features",
			comment: "coreは再利用可能な部品のため、featuresに依存してはならない",
			severity: "error",
			from: { path: "^src/app/core" },
			to: { path: "^src/app/features" },
		},
		{
			name: "no-circular-dependencies",
			comment: "循環参照はメンテナンス性を著しく低下させる",
			severity: "error",
			from: {},
			to: { circular: true },
		},
	],
	options: {
		doNotFollow: {
			path: "node_modules",
		},
		tsPreCompilationDeps: true,
		tsConfig: {
			fileName: "tsconfig.json",
		},
		enhancedResolveOptions: {
			exportsFields: ["exports"],
			conditionNames: ["import", "require", "node", "default"],
		},
		reporterOptions: {
			dot: {
				collapsePattern: "node_modules/(@[^/]+/[^/]+|[^/]+)",
			},
		},
	},
};
