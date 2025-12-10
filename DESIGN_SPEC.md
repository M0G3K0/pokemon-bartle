# Pokémon Bartle Design Specification

## 1. プロジェクト概要
**Pokémon Bartle** は、隠されたポケモンの「タイプ組み合わせ」を、攻撃によるタイプ相性倍率をヒントに特定する論理パズルゲームです。
Wordleライクなインターフェースを採用し、視覚的なフィードバックを通じて正解を導き出します。
特定のポケモン名や姿は使用せず、純粋な「タイプ相性ロジック」に焦点を当てます。

## 2. ゲームロジック (Game Mechanics)

### 2-1. 正解データの生成
*   **対象**: 全18タイプから、単体または2つの異なるタイプの組み合わせを選出。
*   **組み合わせ総数**: 171通り（単体18種 + 複合153種）。
*   **順序**: 順序不同（例: `Fire/Flying` と `Flying/Fire` は等価）。
*   **除外**: 特性（Levitate等）や持ち物による相性変化は一切考慮しない純粋なタイプ相性のみを使用。

### 2-2. 判定ロジック (Type Effectiveness)
第9世代（SV）準拠の標準タイプ相性表を使用します。

*   **情報の重要度 (Semantic Levels)**:
    UI表示およびMasterモード判定に使用する意味的分類です。

| Semantic Level | Multiplier Range | Description | Token Name |
| :--- | :--- | :--- | :--- |
| **Critical** | `x4.0` | 二重弱点。 | `outcome-critical` |
| **High** | `x2.0` | 弱点。 | `outcome-effective` |
| **Neutral** | `x1.0` | 等倍。 | `outcome-neutral` |
| **Low** | `x0.5`, `x0.25` | いまひとつ。 | `outcome-resisted` |
| **No Effect** | `x0.0` | 無効。 | `outcome-immune` |

### 2-3. ゲーム進行
1.  **Start**: 171通りから正解をランダム生成。
2.  **Turn (Max 10)**:
    *   プレイヤーは以下のアクションを選択可能：
        *   **Attack (⚔️)**: 攻撃タイプを選び、相性倍率のヒントを得る。
        *   **Solve (❓)**: 防御タイプ構成を予想する。結果は以下のように判定される：
            *   🟩 **Correct**: 完全一致（クリア）。
            *   🟨 **Close**: 1タイプのみ一致（構成要素の一部が正解）。
            *   ⬛ **Miss**: 不一致（0タイプ一致）。
3.  **End Game**:
    *   **Win**: 10ターン目までに正解構成を回答し、的中させる。
    *   **Continue**: 10ターンを超えてもプレイ継続可能だが、「目標超過」状態となる。スコア記録上は敗北扱い。

## 3. 難易度設計 (Difficulty Modes)

### Beginner
*   **特徴**: 初心者向け。
### Easy (Previous Normal)
*   **特徴**: 初心者向け。具体的な数値情報をすべて開示する。
*   **表示**: `⭕ (x4)`, `⭕ (x2)`, `⚪ (x1)`, `🔺 (x0.5)`, `🔺 (x0.25)`, `✖ (x0)`.
*   **補助**: Type Chart Helper 利用可能。

### Normal
*   **特徴**: 標準ルール。倍率の強度（2倍か4倍か）を隠蔽する。
*   **表示**:
    *   **Super Effective** (`⭕`): 2.0x, 4.0x
    *   **Neutral** (`⚪`): 1.0x
    *   **Not Very Effective** (`🔺`): 0.5x, 0.25x
    *   **No Effect** (`✖`): 0.0x
*   **Turn Limit**: 10 Turns.

### Master
*   **特徴**: 上級者向け。Normalの表示ルールに加え、制約を強化。
*   **制約**:
    1.  **Strict Turns**: 目標ターン数を **6ターン** に短縮。
    2.  **One-Shot Answer**: `Solve`（回答）は**1回のみ**実行可能。失敗した時点（HitやBlowが出たとしても正解でなければ）で即ゲームオーバーとなる。確信が得られるまで回答してはならない。

## 4. デザインシステム (Visual System)

### コンセプト: Neo-Retro
*   **Light Mode固定**: クリーンでモダンなベースに、ドット絵ビットマップフォントや明快な原色使いを組み合わせる。
*   **Grid**: 明確な枠線とグリッドレイアウト。

### タイポグラフィ (Google Fonts)
*   **Pass 1 (Headings/Data)**: `Press Start 2P` (Pixel Art style)
*   **Pass 2 (UI/Text)**: `Roboto Mono` (Monospace, Readable)

### カラーパレット (Type Branding)
各タイプを象徴するカラーコードを定義（Tailwind configに拡張予定）。

| Type | Hex | Type | Hex | Type | Hex |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Normal** | `#A8A77A` | **Fighting** | `#C22E28` | **Flying** | `#A98FF3` |
| **Poison** | `#A33EA1` | **Ground** | `#E2BF65` | **Rock** | `#B6A136` |
| **Bug** | `#A6B91A` | **Ghost** | `#735797` | **Steel** | `#B7B7CE` |
| **Fire** | `#EE8130` | **Water** | `#6390F0` | **Grass** | `#7AC74C` |
| **Electric** | `#F7D02C` | **Psychic** | `#F95587` | **Ice** | `#96D9D6` |
| **Dragon** | `#6F35FC` | **Dark** | `#705746` | **Fairy** | `#D685AD` |

### アイコン表現
*   **方針**: プロジェクト固有の **SVGアセット** (`assets/icons/`) を使用してアイコンを表示します。
    *   **UI Icons**: `assets/icons/ui/*.svg`
    *   **Type Icons**: `assets/icons/types/*.svg`
*   **理由**:
    1.  **Simplicity**: 既存のアセット管理フローを活用し、実装をシンプルに保つため。
    2.  **Customization**: ゲーム特有のテイストに合わせた独自のアイコンデザインを適用するため。

## 5. UIコンポーネント計画

### Screen Layout (Mobile First)

#### 1. Header Area
*   **Title**: "Pokémon Bartle"
*   **Status Indicators**: 現在のモード（Difficulty）、残り回答回数。
*   **Controls**: 設定（Gear）、シェアボタン（結果を絵文字グリッドとしてクリップボードにコピー）。

#### 2. History Grid (Wordle Style)
*   上部から下部へ履歴が積み重なるリスト。
*   **Mobile First**: スマートフォンでの操作性を重視し、片手で自然にスクロール・視認できるサイズ感。
*   **History Row**:
    *   Row Layout: `[Mode Icon] [Selected Type] » [Outcome]`
    *   **UI Component**: `pb-card` with `type="record"`
    *   **Mode Icon**: ⚔️ (Attack) or ❓ (Solve)
    *   **Selected Type**: 選択したタイプのアイコン (`pb-label-chip [iconOnly]="true"`).
    *   **Divider**: `>>` Icon (ChevronsRight).
    *   **Outcome**:
        *   Attack時: 相性記号 (⭕/⚪/🔺✖️)
        *   Solve時: Hit & Blow (🟩/🟨/⬛)

#### 3. Staging Area (入力確認行)
*   **Input Preview**: 決定ボタンを押す前の「一時保存」状態を表示。
*   **Validation**: 選択内容が不完全な場合は決定できないことを視覚的にフィードバック。

#### 4. Control Panel (Input)
*   **Type Keyboard**: 18タイプのボタンをグリッド状に配置。
*   **Action Toggle**:
    *   **Attack Mode (⚔️)**: 何度でも使用可能。相性判定を行う。
    *   **Answer Mode (❓)**: 何度でも使用可能。防御タイプ構成（単体/複合）を選択して回答する。結果は(🟩/🟨/⬛)で示される。
*   **Confirm Button**: 「決定」ボタン。

#### 5. Auto-Memo (Footer/Drawer)
*   履歴に基づき、自動的に更新される相性表メモ。
*   プレイヤーが記憶に頼らず論理パズルに集中できるようにするサポート機能。
*   **Categories**:
    *   `⭕ Super Effective` (2x, 4x)
    *   `⚪ Neutral` (1x)
    *   `🔺 Not Very Effective` (0.5x, 0.25x)
    *   `✖ No Effect` (0x)
*   各カテゴリに、判明したタイプが自動的に分類・表示される。

## 6. 技術スタック
*   **Framework**: Angular 18+ (Standalone Components)
*   **State Management**: Angular Signals
*   **Styling**: Tailwind CSS
*   **Icons**: SVG Assets (Standard Image Loading)
