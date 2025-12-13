📝 PRタイトルの命名規則:
[type]: [description]

タイプ一覧:
- ✨ feat: 新機能
- 🐛 fix: バグ修正
- 📚 docs: ドキュメント
- 🎨 style: スタイル変更
- ♻️ refactor: リファクタリング
- ⚡ perf: パフォーマンス改善
- 🧪 test: テスト
- 🏗️ build: ビルド
- 👷 ci: CI/CD
- 🔧 chore: その他

説明の書き方: 
- 英語で書くこと
- 1行で説明すること
- すべて小文字で書くこと

例: feat: add sound effects and toggle switch

## 💡 概要
Dependabotの設定を見直し、PRの大量生成を防ぐためにグループ化設定を追加。

## 📝 変更内容
- `dependabot.yml` を更新
  - **グループ化**: Angular, Testing, TypeScript, ESLint, GitHub Actions関連をそれぞれグループ化
  - **スケジュール**: 毎週土曜日に実行するように設定
  - **ラベル**: `chore` (npm), `ci` (actions) を付与

## 🔗 関連Issue
Closes #18

## 📷 スクリーンショット（該当する場合）
N/A

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📖 レビュー用語集

| 用語 | 意味 | 説明 |
|------|------|------|
| **LGTM** | Looks Good To Me | 良いと思います |
| **WIP** | Work In Progress | 対応中 |
| **FYI** | For Your Information | 参考までに |
| **must** | must | 必須 |
| **want** | want | できれば |
| **imo** | in my opinion | 私の意見では |
| **nits** | nitpick | 些細な指摘（重箱の隅をつつくの意味） |

## 📌 補足事項
このPRがマージされると、既存のDependabot PRは（次回実行時に）新しいグループ化されたPRに置き換わる形で整理されることが期待されます。
