---
description: 開発ワークフロー（ブランチ作成、コミット、PR作成）
---

## 開発規約

すべての開発規約は `CONTRIBUTING.md` に記載されています。

開発を行う際は、以下を参照してください：
- ブランチ命名規則
- コミットメッセージ規約
- Pull Request規約
- コーディング規約

## PR作成時の必須ルール

**重要**: PRを作成する際は、`.github/PULL_REQUEST_TEMPLATE.md` の**全内容**をPR本文に含めること。
- タイプ一覧（feat, fix, docs, etc.）のセクション
- 概要、変更内容、関連Issue
- チェックリスト
- レビュー用語集
- 補足事項

省略せずにテンプレート全体を使用すること。

## ローカルサーバー確認

PRを作成する前に、必ずローカルサーバーで動作確認を行うこと：
```bash
npm run start
```
ブラウザで http://localhost:4200 を開き、変更した機能が正しく動作することを確認する。

## CIチェック

PRを作成すると、以下が自動でチェックされます：
- Lint (`npm run lint`)
- Build (`npm run build`)
- Test (`npm run test`)
- PRタイトルとブランチ名の形式
