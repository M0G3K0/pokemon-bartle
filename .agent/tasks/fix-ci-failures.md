---
description: CI失敗の修正タスク
status: in-progress
---

# CI失敗の修正

## 現状

GitHubのCIで以下の3つのジョブが失敗しています:
- ✗ CI/Build (pull_request)
- ✗ CI/Lint (pull_request)  
- ✗ CI/Test (pull_request)

## 原因分析

### 1. Lintエラー (36個のエラー)

#### 主な問題
1. **ESLintのセレクタープレフィックス設定が不適切**
   - 現在: `prefix: "app"` のみ許可
   - 問題: デザインシステムコンポーネントは `pb-` プレフィックスを使用
   - 修正: ✅ 完了 - `prefix: "pb"` に変更

2. **`<button>` should have content エラー**
   - 場所: `style-guide.component.html` 312-315行目
   - 原因: `button[pb-action-chip]` ディレクティブを使用しているボタンは、コンテンツをコンポーネント内部で動的に生成するため、HTMLテンプレート上では空に見える
   - 該当コード:
     ```html
     <button pb-action-chip type="fire" label="火" size="m"></button>
     <button pb-action-chip type="water" label="水" size="m"></button>
     <button pb-action-chip type="grass" label="草" size="s"></button>
     <button pb-action-chip type="electric" label="電" size="s"></button>
     ```
   - 修正方法: ESLintルールを調整して、ディレクティブベースのコンポーネントを除外

3. **その他のエラー**
   - 詳細確認が必要

### 2. Buildエラー
- Lintエラーが解決されれば、ビルドも成功する可能性が高い

### 3. Testエラー  
- Lintエラーが解決されれば、テストも成功する可能性が高い

## 修正計画

### ステップ1: ESLint設定の調整 ✅
- [x] `eslint.config.js` のプレフィックス設定を `"pb"` に変更

### ステップ2: elements-contentルールの調整
- [ ] `eslint.config.js` で `@angular-eslint/template/elements-content` ルールを調整
- [ ] ディレクティブベースのコンポーネント（`pb-action-chip`など）を除外

### ステップ3: 残りのLintエラーの確認と修正
- [ ] すべてのLintエラーをリスト化
- [ ] 各エラーを個別に修正

### ステップ4: ローカルでの検証
- [ ] `npm run lint` が成功することを確認
- [ ] `npm run build -- --configuration production` が成功することを確認
- [ ] `npm run test -- --watch=false --browsers=ChromeHeadless` が成功することを確認

### ステップ5: 修正のコミットとプッシュ
- [ ] 変更をコミット
- [ ] PRにプッシュ
- [ ] CIが成功することを確認

## 次のアクション

1. ESLintの `elements-content` ルールを調整
2. 全Lintエラーの詳細を確認
3. 必要に応じて追加修正
