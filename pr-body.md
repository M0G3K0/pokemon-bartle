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
`game.component.html` のMemo Area（Historyカードとメモエリア）からTailwind CSSを完全に削除し、SCSSとデザインシステムに置き換えました。

## 📝 変更内容
- **Historyセクション**:
  - `.memo-section`, `.history-section` を定義
  - `.memo-section-title` を定義（統一されたタイトルスタイル）
  - `.history-row`, `.history-label`, `.history-separator`, `.history-chips` を定義
  - `.mini-chip` + `data-type` 属性で動的なタイプカラーを適用（`@each`ループで生成）
- **Memoグリッド**:
  - `.memo-grid`, `.memo-item`, `.memo-chip` を定義
  - `.memo-overlay`, `.memo-overlay-icon` を定義（オーバーレイアイコン）
  - `pb-action-chip` を維持しつつ、ラッパー要素のTailwindを削除

## 🔗 関連Issue
Related to #19

## 📷 スクリーンショット（該当する場合）
ローカル開発サーバーで動作確認済み

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
このPRで `game.component.html` からのTailwind削除がほぼ完了します。残りはモーダル/ダイアログ部分のみです。
