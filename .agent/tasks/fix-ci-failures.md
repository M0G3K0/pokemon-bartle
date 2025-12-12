---
description: CI失敗の修正タスク
status: done
---

# CI失敗の修正

## 達成状況

GitHubのCI失敗を修正するための以下のタスクを完了しました：

### 1. Lintエラーの完全解消 ✅
すべてのLintエラーを解消しました（36個 → 0個）。
主な修正内容は以下の通りです：
- **ESLint設定**: 
  - コンポーネント/ディレクティブのプレフィックスを `app` から `pb` に変更
  - `component-selector` ルールで属性セレクター（`button[pb-button]`など）を許可するように `type: ["element", "attribute"]` を設定
  - ディレクティブベースのコンポーネントのために `elements-content` と `interactive-supports-focus` ルールを無効化
- **HTMLテンプレート**:
  - 非推奨の `*ngIf` 構文を新しい `@if/@else` ブロック構文に移行
  - アクセシビリティ向上のため、すべての `<img>` タグに `alt` 属性を追加
  - モーダルのバックドロップクリック処理など、キーボードイベントを伴わない正当な `click` ハンドラにESLint無効化コメントを追加
- **TypeScript**:
  - 不要な `CommonModule`, `HostBinding`, `signal` インポートの削除
  - 空のコンストラクタ `constructor() {}` の削除
  - 型アサーション `as any` の削除（適切な型定義を確認後）

### 2. Buildエラーの解消 ✅
- `npm run build -- --configuration production` がローカルで成功することを確認しました。

### 3. Testの確認 ✅
- `npm run test -- --watch=false --browsers=ChromeHeadless` がローカルで成功することを確認しました。
- `app.component.spec.ts` に含まれていた、すでに存在しないタイトル要素（`h1`）をチェックするテストを削除しました。

### 4. CI環境依存の問題解決 ✅
- CI上の `npm ci` で発生していた `package-lock.json` と `package.json` の不整合エラーを解決しました。
  - `chokidar` などの依存関係バージョンの不一致が原因
  - `node_modules` と `package-lock.json` を削除し、クリーンな状態で再生成 (`npm install`) することで解決

## 最終確認
- ローカルサーバー (`npm start`) での正常動作確認済み
- すべての修正をコミットし、PRにプッシュ済み

## 教訓
- `npm ci` エラーが発生した場合、手動で依存関係を追加するのではなく、ローカル環境で `package-lock.json` を再生成するのが最も確実な解決策である。
- デザインシステム特有のパターン（属性セレクターコンポーネントなど）を使用する場合、早めにESLint設定を調整する必要がある。
