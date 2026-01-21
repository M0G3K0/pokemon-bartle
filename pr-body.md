
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
dependency-cruiserを導入し、レイヤー境界の自動チェックを実装。

### ガードレール（構造の憲法）
- `core → features` の依存を禁止
- 循環参照を禁止

## 📝 変更内容
- `.dependency-cruiser.js` 新規作成: レイヤー境界ルール設定
- `package.json` 更新: `npm run dep-check` スクリプト追加
- `package-lock.json` 更新: dependency-cruiserパッケージ追加

## 🔗 関連Issue
Related to #63

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
現時点で1件の違反を検出（`chip.component.ts → type-icon.component.ts`）。これは別PRで修正予定。
