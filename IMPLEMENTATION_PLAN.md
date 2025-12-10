Tailwind CSS削除とデザインシステム統合（修正版）
現在の独自実装の監査
目的
game.component.html
内のすべてのdiv/spanによる独自実装を洗い出し、計画実行後にクリーンなデザインシステムのみを使った画面構成になることを確認する。

監査結果：独自実装の分類と対応方法
カテゴリ1: Layout Component で置き換え可能
行番号	現在の実装	対応方法
5	<div class="sticky top-0 z-20 bg-background-canvas/90 backdrop-blur-sm shadow-sm">	削除: pb-global-headerにvariant="sticky"を追加
7	<div actions class="flex items-center gap-sm">	置換: <pb-layout actions type="flex" align="center" gap="sm">
9	<div class="hidden sm:flex items-center gap-xs text-text-secondary">	置換: <pb-layout type="flex" align="center" gap="xs"> + レスポンシブクラス
15	<div class="flex items-center gap-[4px]">	置換: <pb-layout type="flex" align="center" gap="xs">
30-33	<div class="sm:hidden flex items-center justify-between ...">	機能固有クラス: .mobile-status-bar (game.component.scss)
37	<div class="w-full max-w-md mx-auto px-xs py-xs flex flex-col gap-sm">	置換: <pb-layout preset="game-content">
40	<div class="flex flex-col gap-xs min-h-[200px]">	置換: <pb-layout type="stack" gap="xs" style="min-height: 200px">
42	<div class="grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-sm gap-y-xs">	置換: <pb-layout preset="history-grid">
111	<div class="flex flex-col gap-md">	置換: <pb-layout type="stack" gap="md">
194	<div class="flex flex-wrap gap-[4px] justify-center">	置換: <pb-layout type="flex" gap="xs" style="flex-wrap: wrap; justify-content: center">
204	<div class="flex gap-md h-[48px]">	置換: <pb-layout type="flex" gap="md" style="height: 48px">
206	<div class="flex-1 flex bg-gray-100 rounded-sm p-1 gap-1">	機能固有クラス: .mode-selector (game.component.scss)
233	<div class="flex flex-col gap-md">	置換: <pb-layout type="stack" gap="md">
235	<div class="flex-1 flex flex-col gap-xs pb-sm border-b border-gray-100">	置換: <pb-layout type="stack" gap="xs"> + 機能固有クラス
241-277	履歴行の<div class="flex items-center gap-xs">	置換: <pb-layout type="flex" align="center" gap="xs"> (繰り返し)
285	<div class="grid grid-cols-9 gap-[2px]">	置換: <pb-layout type="grid" columns="9" gap="xs">
321	<div class="flex flex-col gap-md text-text-primary">	置換: <pb-layout type="stack" gap="md">
392	<div class="flex flex-col gap-md">	置換: <pb-layout type="stack" gap="md">
394	<div class="flex flex-col gap-sm">	置換: <pb-layout type="stack" gap="sm">
422	<div footer class="w-full flex justify-end gap-sm">	置換: <pb-layout footer type="flex" justify="end" gap="sm">
カテゴリ2: Card Component内の絶対配置（削除可能）
行番号	現在の実装	対応方法
47	<div class="relative w-full h-full">	削除: pb-card自体にposition: relativeを適用
49-53	<div class="absolute top-1/2 -translate-y-1/2 left-xs">	削除: アイコンに直接絶対配置を適用 (SCSS)
69-71	<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">	削除: pb-iconに直接絶対配置を適用 (SCSS)
74-91	<div class="absolute top-1/2 -translate-y-1/2" style="left: calc(50% + 16%);">	削除: spanに直接絶対配置を適用 (SCSS)
98-103	空カード内の同様のdiv	削除: 同上
118-190	Staging Area内の絶対配置div	削除: 同上
カテゴリ3: 機能固有のスタイル（SCSSクラスで管理）
行番号	現在の実装	対応方法
10-11	<span class="px-sm py-xs bg-gray-100 rounded text-xs font-bold uppercase tracking-wider">	機能固有クラス: .difficulty-badge
50-52	<div class="text-lg leading-none">	機能固有クラス: .mode-icon
77, 81, 84, 87-89	<span class="text-lg leading-none">	機能固有クラス: .outcome-emoji
143-146	<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-text-tertiary font-bold pointer-events-none whitespace-nowrap">	機能固有クラス: .select-type-placeholder
189	<div class="text-right min-w-[24px]">	削除: 不要なプレースホルダー
207-220	モードセレクターのbutton	機能固有クラス: .mode-button
242-277	履歴行の各要素	機能固有クラス: .history-row-item
287-307	メモチップのオーバーレイ	機能固有クラス: .memo-chip-overlay
295-299, 301-305	<div class="absolute inset-0 z-10 bg-transparent flex items-center justify-center pointer-events-none">	機能固有クラス: .chip-overlay-icon
カテゴリ4: デザインシステムコンポーネントで既に対応済み
行番号	現在の実装	対応方法
2	<pb-layout type="stack" gap="none" class="bg-background-canvas min-h-screen relative">	維持: デザインシステムコンポーネント使用中
6	<pb-global-header>	維持: デザインシステムコンポーネント使用中
45, 96	<pb-card>	維持: デザインシステムコンポーネント使用中
58-65	<pb-label-chip>	維持: デザインシステムコンポーネント使用中
70	<pb-icon>	維持: デザインシステムコンポーネント使用中
232	<pb-card>	維持: デザインシステムコンポーネント使用中
320, 391, 429	<pb-modal>	維持: デザインシステムコンポーネント使用中
監査結果サマリー
総div/span数: 約80箇所
Layout Componentで置き換え: 約25箇所
削除可能（不要なラッパー）: 約15箇所
機能固有SCSSクラスで管理: 約20箇所
既にデザインシステム使用: 約20箇所

計画実行後の状態:

✅ すべてのレイアウトはpb-layoutコンポーネントで管理
✅ 不要なラッパーdivは完全削除
✅ 機能固有のスタイルは明確なクラス名で
game.component.scss
に集約
✅ HTMLは最小限のクラス（1-2個）のみ
✅ デザインシステムコンポーネントを最大限活用
目標
HTMLテンプレートからすべてのTailwind CSSユーティリティクラスを削除し、スタイルをデザインシステム（SCSS）に集約することで、コードベースをよりクリーンで保守しやすく、読みやすくする。

トークンアーキテクチャの理解（最重要）
1. プリミティブトークン (Primitive Tokens)
定義: デザインの最も基本的な「原始的な値」そのもの。
具体例: #FFFFFF（白）、16px（16ピクセル）、#000000（黒）などの色コードや数値。
役割: 特定の文脈に依存せず、純粋な値として定義され、他のトークンの土台となる。
現状: 
_primary-colors.scss
, 
_spacing.scss
, 
_typography.scss
など

// 例: _primary-colors.scss（グレースケールなど、意味を持たない純粋な色）
--pb-color-gray-100: #f3f4f6;  // ← これがプリミティブトークン
--pb-color-gray-900: #111827;
2. セマンティックトークン (Semantic Tokens)
定義: プリミティブトークンに「意味」や「役割」を割り当てたもの。
具体例: --pb-text-primary（プライマリテキスト色）、--pb-background-canvas（ページ背景色）、--pb-result-win（勝利色）など。
役割: 「これは何のために使われる色か」「これは見出しなのか本文なのか」といった意図を伝え、特定のコンテキスト（文脈）で利用される。
現状: 
_semantic-tokens.scss

// 例: _semantic-tokens.scss
--pb-text-primary: var(--pb-color-gray-900);  // ← プリミティブを参照
--pb-background-canvas: var(--pb-color-gray-50);
// Win/Lose色も意味を持つのでセマンティック
--pb-result-win: var(--pb-color-win-500);  // ← 「勝利」という意味を持つ
--pb-result-lose: var(--pb-color-lose-600);  // ← 「敗北」という意味を持つ
3. コンポーネントトークン (Component Tokens)
定義: セマンティックトークンを組み合わせて、具体的なUIコンポーネント（ボタン、カードなど）の一部として機能するように定義したもの。
具体例: --pb-button-primary-bg（プライマリボタンの背景色）など、より具体的な部品レベルのトークン。
役割: 「プライマリボタン」という具体的な部品の見た目を一元管理し、デザインの一貫性を保つ。
現状: 
_component-tokens.scss

// 例: _component-tokens.scss
--pb-button-primary-bg: var(--pb-action-primary);  // ← セマンティックを参照
--pb-card-bg: var(--pb-background-surface);
背景
現在、コードベースではHTMLテンプレート全体でTailwind CSSユーティリティクラスが広範囲に使用されています。これにより以下の問題が発生しています：

可読性の低下: 1要素に複数のクラス（例：class="flex items-center gap-sm text-text-secondary"）
冗長性: 親要素と子要素で同じスタイルが繰り返される
不要なラッパーdiv: スタイル目的だけで追加されたdiv
一貫性の欠如: Tailwindユーティリティとデザインシステムトークンの混在
デザインシステムは既に包括的なトークン（プリミティブ、セマンティック、コンポーネント）を提供していますが、十分に活用されていません。

ユーザーレビュー必須
IMPORTANT

破壊的変更: このリファクタリングはプロジェクト内のほぼすべてのHTMLファイルに影響します。機能は同一のままですが、HTML構造は大幅に変更されます。

WARNING

段階的な実装が必須: 全てを一度に破壊しないよう、段階を踏んでリファクタリングを進めます。各ステップで動作確認を行い、問題があれば即座にロールバックできるようにします。

提案する変更
フェーズ1: 分析と監査
Tailwindクラスのインベントリ
game.component.html
および他のコンポーネントを分析し、使用中のすべてのTailwindクラスをカタログ化し、どのトークンレベルで対応すべきかを決定：

レイアウトクラス → Layout Componentで対応:

flex, flex-col, 
grid
, grid-cols-*, grid-rows-*
items-center, justify-center, justify-between
gap-*, gap-x-*, gap-y-*
ポジショニングクラス → コンポーネント固有のSCSSで対応:

relative, absolute, sticky, top-*, left-*, right-*
スペーシングクラス → セマンティックトークンで対応:

p-*, px-*, py-*, m-*, mx-*, my-*
space-y-*
タイポグラフィクラス → セマンティックトークンで対応:

text-*（サイズ、カラー）
font-*（ウェイト）
leading-*, tracking-*, uppercase
ビジュアルクラス → セマンティック/コンポーネントトークンで対応:

bg-*, border-*, rounded-*, shadow-*
opacity-*, z-*
レスポンシブクラス → メディアクエリで対応:

sm:*, lg:*, hidden, sm:flex
フェーズ2: デザインシステムの拡張
[MODIFY] 
src/styles/tokens/_semantic-tokens.scss
不足しているセマンティックトークンを追加：

// ----------------------------------------
// Layout Semantic Tokens
// ----------------------------------------
--pb-layout-max-width-sm: 24rem;  // 384px
--pb-layout-max-width-md: 28rem;  // 448px
--pb-layout-max-width-lg: 32rem;  // 512px
// ----------------------------------------
// Z-Index Semantic Tokens
// ----------------------------------------
--pb-z-index-sticky: 20;
--pb-z-index-modal: 50;
--pb-z-index-overlay: 40;
// ----------------------------------------
// Backdrop Semantic Tokens
// ----------------------------------------
--pb-backdrop-blur: blur(8px);
--pb-backdrop-opacity: 0.9;
[MODIFY] 
src/app/core/components/global-header/global-header.component.ts
グローバルヘッダーにstickyバリアントを追加：

@Input() variant: 'default' | 'sticky' = 'default';
[MODIFY] 
src/app/core/components/global-header/global-header.component.scss
Stickyバリアント用のスタイルを追加：

// Sticky variant
:host.sticky .header {
  position: sticky;
  top: 0;
  z-index: var(--pb-z-index-sticky);
  background: rgba(var(--pb-background-canvas-rgb), var(--pb-backdrop-opacity));
  backdrop-filter: var(--pb-backdrop-blur);
  box-shadow: var(--pb-shadow-sm);
}
[MODIFY] 
src/app/core/components/layout/layout.component.ts
Layout Componentに新しいプリセットを追加：

// 新しいプリセットタイプを追加
@Input() preset: 'history-grid' | 'game-content' | undefined;
// プリセットに基づいてクラスを自動設定
layoutClass = computed(() => {
  if (this.preset === 'history-grid') {
    return 'grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-sm gap-y-xs';
  } else if (this.preset === 'game-content') {
    return 'flex flex-col gap-sm w-full max-w-md mx-auto px-xs py-xs';
  }
  // ... 既存のロジック
});
フェーズ3: コンポーネントのリファクタリング（段階的）
CAUTION

段階的な実装: 以下の順序で1つずつリファクタリングし、各ステップで動作確認を行います。

ステップ3-1: Game Header のリファクタリング
[MODIFY] game.component.scss

// Difficulty Badge用のスタイル（機能固有のクラス）
.difficulty-badge {
  background: var(--pb-background-subtle);
  padding: var(--pb-spacing-xs) var(--pb-spacing-sm);
  border-radius: var(--pb-radius-sm);
  font-size: var(--pb-font-size-body-sm);
  font-weight: var(--pb-font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--pb-letter-spacing-wide);
}
// モバイルステータスバー用のスタイル
.mobile-status-bar {
  background: var(--pb-background-subtle);
  border-bottom: 1px solid var(--pb-border-subtle);
  padding: var(--pb-spacing-xs) var(--pb-spacing-md);
  font-size: var(--pb-font-size-body-sm);
  color: var(--pb-text-secondary);
  
  @media (min-width: 640px) {
    display: none;
  }
}
[MODIFY] game.component.html (ヘッダー部分のみ)

<!-- 変更前 -->
<div class="sticky top-0 z-20 bg-background-canvas/90 backdrop-blur-sm shadow-sm">
  <pb-global-header title="Pokémon Bartle">
    <div actions class="flex items-center gap-sm">
      <div class="hidden sm:flex items-center gap-xs text-text-secondary">
        <span class="px-sm py-xs bg-gray-100 rounded text-xs font-bold uppercase tracking-wider">
          {{ difficulty() }}
        </span>
      </div>
      ...
    </div>
  </pb-global-header>
  
  <div class="sm:hidden flex items-center justify-between px-md py-xs bg-gray-50 border-b border-gray-100 text-xs text-text-secondary">
    <span class="font-bold uppercase tracking-wider">{{ difficulty() }}</span>
  </div>
</div>
<!-- 変更後 -->
<pb-global-header title="Pokémon Bartle" variant="sticky">
  <pb-layout actions type="flex" align="center" gap="sm">
    <div class="difficulty-indicator">
      <span class="difficulty-badge">{{ difficulty() }}</span>
    </div>
    ...
  </pb-layout>
</pb-global-header>
<div class="mobile-status-bar">
  <span>{{ difficulty() }}</span>
</div>
検証: ヘッダーが正しく表示され、sticky動作が機能することを確認。

ステップ3-2: History Grid のリファクタリング
[MODIFY] game.component.html (履歴エリアのみ)

<!-- 変更前 -->
<div class="flex flex-col gap-xs min-h-[200px]">
  <div class="grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-sm gap-y-xs">
    @for (item of history; track $index) {
      ...
    }
  </div>
</div>
<!-- 変更後 -->
<pb-layout type="stack" gap="xs" style="min-height: 200px">
  <pb-layout preset="history-grid">
    @for (item of history; track $index) {
      ...
    }
  </pb-layout>
</pb-layout>
検証: 履歴グリッドが2列5行で正しく表示されることを確認。

ステップ3-3: Main Content のリファクタリング
[MODIFY] game.component.html (メインコンテンツ部分のみ)

<!-- 変更前 -->
<div class="w-full max-w-md mx-auto px-xs py-xs flex flex-col gap-sm">
  ...
</div>
<!-- 変更後 -->
<pb-layout preset="game-content">
  ...
</pb-layout>
検証: コンテンツが中央揃えで正しく表示されることを確認。

ステップ3-4: 不要なラッパーdivの削除
対象:

History Card内の<div class="relative w-full h-full"> → pb-cardに直接スタイル適用
その他スタイル目的だけのdiv
原則: コンポーネント自体にスタイルを適用できる場合は、ラッパーdivを削除。

フェーズ4: Tailwind依存関係の完全削除
[MODIFY] tailwind.config.js
Tailwindの設定を完全に削除または無効化。

[MODIFY] 
src/styles.scss
Tailwindディレクティブを完全に削除：

// 削除
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
[MODIFY] 
package.json
Tailwind CSS関連の依存関係を削除（必要に応じて）。

検証計画
段階的な検証
各フェーズ完了後に以下を実施：

ビジュアル検査:

npm start
変更した部分が正しく表示されることを確認
レスポンシブ動作を確認（450px以下でチップが縮小）
Git コミット:

各ステップごとにコミットを作成
問題があれば即座にrevert可能
コンポーネントチェックリスト:

 グローバルヘッダーが正しく表示される
 履歴エリアのグリッドレイアウトが維持されている
 タイプチップが正しく配置されている
 タイプ選択エリアが中央揃えされている
 モーダルが正しく開いて表示される
 レスポンシブ動作が機能する
 すべてのスペーシングが元のデザインと一致
 ビジュアルリグレッションなし
ロールバック計画
問題が見つかった場合：

該当するGitコミットにrevert
問題を分析・修正
再度適用
成功基準
✅ HTMLにTailwindユーティリティクラスがゼロ
✅ すべてのスタイルがトークン（プリミティブ→セマンティック→コンポーネント）で定義されている
✅ HTML要素ごとに最大1-2クラス（セマンティッククラス）
✅ Layout Componentを最大限活用
✅ 不要なラッパーdivなし
✅ コンポーネントのSCSSはコンポーネントトークンを使用し、必要最小限の上書きのみ
✅ ビジュアルリグレッションなし
✅ コードの可読性向上
✅ 保守・拡張が容易
✅ 段階的な実装により、各ステップで動作確認済み
