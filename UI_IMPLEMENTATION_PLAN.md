# Game UI Implementation Plan (Updated)

## 1. Overview
本ドキュメントは、Pokemon Bartleのゲーム画面（Main Game Interface）のUI構成計画です。
最新のデザインシステム（v2）で定義済みのコンポーネントのみを使用し、レスポンシブかつ直感的なインターフェースを構築します。

## 1-1. Critical Implementation Rules (Strict)
**新しいページやコンポーネントを作成する際は、既存のデザインシステム（Core Components, Tokens）を完全に踏襲することを最重要ルールとします。**

*   **No Ad-hoc Styles**: HTMLテンプレート内で `class="..."` を使用して独自のスタイル（マージン調整を除く）や色、フォントサイズを定義することを**禁止**します。
*   **Component First**: 必要なUIパーツがある場合は、既存の `pb-core-*` コンポーネントを使用してください。もし不足している場合は、ページ固有のスタイルを書くのではなく、まずコアコンポーネントを拡張・改修することを検討してください。
*   **Purpose**: サイト全体で一貫した「Neo-Retro」の美学と操作感を維持するため。

## 2. Page Structure (Layout)

全体のレイアウトは `pb-layout type="stack"` をベースとし、以下の4つの主要セクションで構成します。

1.  **Header Area** (固定)
2.  **History Area** (スクロールメイン)
3.  **Control Area** (固定または下部配置)
    *   Staging (Preview)
    *   Type Keyboard
    *   Action Selectors
4.  **Auto-Memo Area** (最下部またはドロワー)

また、各レイヤーの上に **Dialogs (Modals)** がオーバーレイします。

---

## 3. Section Detail & Component Mapping

### 3-1. Header Area
画面上部に常駐するヘッダー。

*   **Component**: `pb-global-header`
*   **Props**:
    *   `title`: "Pokemon Bartle"
*   **Slots**:
    *   `[actions]`: 右側にアクショングループを配置。
    *   **Items**:
        *   `pb-icon-button icon="help-circle"` -> Opens Help Modal
        *   `pb-icon-button icon="settings"` -> Opens Settings Modal
        *   `pb-icon-button icon="share-2"` -> Opens Share Sheet

### 3-2. History Area
プレイヤーの行動履歴を表示するエリア。

*   **Layout**: `pb-layout type="grid" [columns]="1" [lgColumns]="2"`
*   **Items**:
    *   **Component**: `pb-card type="record"`
    *   **Content**:
        *   **Mode Icon**: `<div>⚔️</div>` or `<div>❓</div>` (w-xl fixed)
        *   **Selected Type**: `pb-label-chip [iconOnly]="true" [size]="s"` (w-2xl)
        *   **Divider**: `<img>` (chevron-right) (w-xl)
        *   **Outcome**: `<div>⭕</div>` or `<div>🟩</div>` (w-[24px])

### 3-3. Control Area
入力と決定を行う操作エリア。

#### A. Staging (Input Preview)
*   **Component**: `pb-card type="record"`
*   決定前のプレビュー。未選択時はプレースホルダーを表示。

#### B. Type Keyboard
*   **Layout**: `pb-layout type="grid" [columns]="6"` (PC) or Responsive
*   **Items**: `pb-label-chip radius="sm"` (Clickable)

#### C. Action Selectors
*   **Mode Toggle**:
    *   攻撃(⚔️) / 回答(❓) の切り替え。
    *   **Implementation**: 2つの `pb-button` を並べ、選択状態に応じて `variant="primary"` と `variant="outline"` (or `secondary`) を切り替える。
*   **Confirm Button**:
    *   `pb-button label="決定" variant="primary" [fullWidth]="true"`
    *   未選択時は `[disabled]="true"`.

### 3-4. Auto-Memo Area
*   **Component**: `pb-card`
*   **Content**: 各判定(⭕, ⚪, 🔺, ✖)に対応するタイプ一覧表示。

### 3-5. Dialogs (Modals)
ゲーム進行やシステム操作で使用するオーバーレイUI。

*   **Component**: `pb-modal`
*   **Variants**:
    *   **Settings Modal**: 難易度設定。各難易度がどんなものかも説明
    *   **Help Modal**: ルール説明。
    *   **Result Modal (Win/Lose)**:
        *   **Header**: "Congratulations!" or "Game Over"
        *   **Body**: 正解のタイプ表示、スコア詳細。
        *   **Footer**:
            *   `pb-button label="Next Game" variant="primary"` (Win)
            *   `pb-button label="Try Again" variant="primary"` (Lose)
            *   `pb-button label="Give Up" variant="secondary"` (Lose)

---

## 4. UI Component Hierarchy (Tree)

```
GamePageComponent
├── GlobalHeader
│   └── Actions (IconButtons)
│
├── MainContainer
│   ├── HistorySection
│   ├── ControlSection
│   │   ├── StagingCard
│   │   ├── TypeKeyboard
│   │   └── ActionPanel (Mode Toggle + Confirm)
│   └── MemoSection
│
├── SettingsModal (pb-modal)
├── HelpModal (pb-modal)
└── ResultModal (pb-modal)
```
