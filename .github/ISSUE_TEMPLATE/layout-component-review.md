---
name: Layout Component Review
about: Design System のレイアウトコンポーネント見直し
title: "[Design System] *-area / *-grid クラスを pb-layout コンポーネントに統合すべきか検討"
labels: 'design-system, refactor, discussion'
---

## 📋 概要

現在、`game.component.scss` をはじめとして `*-area` や `*-grid` といったカスタムSCSSクラスでレイアウトを定義しています。これらを `pb-layout` コンポーネントで統一すべきかどうかを検討し、必要に応じて実装まで行いたいと思います。

---

## 🔍 現状分析

### 現在のカスタムレイアウトクラス

| クラス名 | ファイル | 定義内容 |
|---------|---------|----------|
| `.history-area` | game.component.scss | `flex-direction: column`, `gap: xs`, `min-height: 200px` |
| `.control-area` | game.component.scss | `flex-direction: column`, `gap: md` |
| `.history-grid` | game.component.scss | 2列×5行グリッド, `grid-auto-flow: column` |
| `.memo-grid` | game.component.scss | 9列グリッド, `gap: 2px` |

### 現在の `pb-layout` コンポーネントの機能

- **type**: `grid` | `stack` | `flex`
- **columns / lgColumns**: グリッドの列数（レスポンシブ対応）
- **gap**: `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `none`
- **direction / align / justify**: Flex用オプション

---

## 🎯 検討ポイント

### 1. デザインシステムでレイアウトを担保すべき理由とは？

**メリット:**
- ✅ 一貫性: 全コンポーネントで同じレイアウトパターンを使用
- ✅ 保守性: レイアウトの変更をコンポーネント単位で一括管理可能
- ✅ ドキュメント化: Style Guide で全レイアウトパターンを可視化できる
- ✅ 再利用性: 新しいページ/コンポーネントで同じレイアウトを簡単に適用

**デメリット:**
- ⚠️ 柔軟性の低下: 特殊なレイアウト要件への対応が難しくなる可能性
- ⚠️ コンポーネントの複雑化: バリエーションが増えすぎると管理が大変

---

### 2. `pb-layout` の適用範囲はどこまでにすべきか？

#### オプションA: 全体配置のみ（ナビゲーション、メインコンテンツ領域など）

```
┌─────────────────────────────┐
│        pb-global-header     │  ← デザインシステム
├─────────────────────────────┤
│   pb-layout (メインコンテンツ)│  ← デザインシステム
│  ┌────────┬────────────────┐│
│  │history │ control        ││  ← カスタムSCSS でOK
│  │  area  │   area         ││
│  └────────┴────────────────┘│
└─────────────────────────────┘
```

- **pros**: シンプル、柔軟性維持
- **cons**: 各コンポーネント内部のレイアウトが分散しがち

#### オプションB: セクション単位まで `pb-layout` で定義

```
┌─────────────────────────────┐
│        pb-global-header     │  ← デザインシステム
├─────────────────────────────┤
│ pb-layout preset="game-main" │ ← デザインシステム
│  ┌──────────────────────────┐│
│  │ pb-layout preset="history"│ ← デザインシステム
│  └──────────────────────────┘│
│  ┌──────────────────────────┐│
│  │ pb-layout preset="control"│ ← デザインシステム
│  └──────────────────────────┘│
└─────────────────────────────┘
```

- **pros**: 完全な一貫性、デザインシステム完全準拠
- **cons**: コンポーネントが増える、オーバーエンジニアリングのリスク

---

### 3. どちらが保守的な開発になるか？

| 観点 | オプションA（大枠のみ） | オプションB（細かく定義） |
|------|----------------------|------------------------|
| **初期実装コスト** | 低い | 高い |
| **長期保守性** | 中程度 | 高い（ただしバリエーション管理が必要） |
| **チーム開発** | 個人裁量が大きい | ルールが明確 |
| **デザイン変更対応** | 各所で修正 | 一箇所で修正 |

---

### 4. デザインシステムとしての扱いやすさ

- **オプションA（大枠のみ）**: 開発者にとっては柔軟で扱いやすいが、デザインの一貫性は開発者の裁量に依存
- **オプションB（細かく定義）**: デザインシステムに完全準拠、一貫性は高いが、バリエーション管理のオーバーヘッド

---

## 📝 もし実装するなら

`pb-layout` コンポーネントに以下のような `preset` 入力を追加することが考えられます：

```typescript
// layout.component.ts
@Input() preset?: 
  | 'history-grid'      // 2×5 column-first grid
  | 'memo-grid'         // 9-column grid for memo chips
  | 'game-content'      // Main game area wrapper
  | 'control-area'      // Vertical stack with md gap
  | 'history-area';     // Vertical stack with xs gap
```

使用例：
```html
<!-- Before -->
<div class="history-area">
  <div class="history-grid">...</div>
</div>

<!-- After -->
<pb-layout preset="history-area">
  <pb-layout preset="history-grid">...</pb-layout>
</pb-layout>
```

---

## ✅ 決定すべき事項

- [ ] レイアウトをデザインシステムで管理する範囲（オプションA or B）
- [ ] `pb-layout` に追加すべき preset の一覧
- [ ] 既存の `*-area` / `*-grid` クラスの移行戦略

---

## 📚 関連

- `src/app/core/components/layout/layout.component.ts`
- `src/app/features/game/game.component.scss`
- 過去の会話: Design System Refactoring
