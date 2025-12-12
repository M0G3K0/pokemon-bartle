import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeIconComponent } from '../type-icon/type-icon.component';
import { CardComponent } from '../../core/components/card/card.component';
import { ChipComponent } from '../../core/components/chip/chip.component';
import { IconButtonComponent } from '../../core/components/icon-button/icon-button.component';
import { IconComponent } from '../../core/components/icon/icon.component';
import { GlobalHeaderComponent } from '../../core/components/global-header/global-header.component';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';
import { SubSectionHeaderComponent } from '../../core/components/sub-section-header/sub-section-header.component';
import { CatalogItemComponent } from '../../core/components/catalog-item/catalog-item.component';
import { LayoutComponent } from '../../core/components/layout/layout.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { LucideAngularModule, Settings, HelpCircle, Share2, Info } from 'lucide-angular';
import { SemanticColors, RadiusScale, SpacingScale, ZIndexScale } from '../../../design-system/tokens';

interface LabelChipItem {
	title: string;
	items: {
		name: string;
		desc: string;
		meta: string;
		props: {
			label?: string;
			type: string;
			radius?: 'sm' | 'full';
			size?: 'm' | 's'; // Fix: Allow size property
			withIcon?: boolean;
			iconOnly?: boolean;
		}
	}[];
}

@Component({
	selector: 'pb-style-guide',
	standalone: true,
	imports: [
		CommonModule,
		TypeIconComponent,
		CardComponent,
		ChipComponent,
		IconButtonComponent,
		IconComponent,
		ButtonComponent,
		LucideAngularModule,
		GlobalHeaderComponent,
		SectionHeaderComponent,
		SubSectionHeaderComponent,
		CatalogItemComponent,
		LayoutComponent,
		ModalComponent
	],
	templateUrl: './style-guide.component.html',
	styleUrl: './style-guide.component.css'
})
export class StyleGuideComponent {
	isModalOpen = false;

	openModal() {
		this.isModalOpen = true;
	}

	sectionTitles = {
		appTitle: 'Pokémon Bartle Design System',
		appDesc: 'Neo RetroをテーマにしたPokémon Bartleのデザインシステムです。',
		typography: '1. Typography',
		titles: 'Titles (Press Start 2P)',
		body: 'Body (Roboto Mono)',
		primitiveTokens: '2. Primitive Tokens',
		gray: 'Gray',
		semanticTokens: '3. Semantic Tokens',
		colors: 'Colors',
		structure: 'Structure',
		icons: '4. Icons',
		typeIdentity: '5. Type Identity',
		uiComponents: '6. UI Components',
		button: 'Button',
		iconButtons: 'Icon Buttons',
		labelChip: 'Label Chip',
		card: 'Card',
		dialogs: 'Dialogs'
	};


	// 1. Typography
	typography = {
		titles: [
			{ name: 'Title L', class: 'text-title-l', desc: '15px | Bold | Game Title, Section Header' },
			{ name: 'Title M', class: 'text-title-m', desc: '14px | Bold | Sub Section Header' },
			{ name: 'Title S', class: 'text-title-s', desc: '13px | Bold | Card Title, Small Header' },
		],
		body: [
			{ name: 'Body MD (Default)', class: 'text-body-md', desc: '14px | Regular | Default text' },
			{ name: 'Body MD Bold', class: 'text-body-md-bold', desc: '14px | Bold | Emphasized text' },
			{ name: 'Body SM', class: 'text-body-sm', desc: '12px | Regular | Caption, Meta info' },
			{ name: 'Body SM Bold', class: 'text-body-sm-bold', desc: '12px | Bold | Small labels' },
		]
	};

	pokemonTypes = [
		'normal', 'fire', 'water', 'electric', 'grass', 'ice',
		'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
		'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
	];

	primitiveScales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	typeTranslations: Record<string, string> = {
		normal: 'ノーマル',
		fire: 'ほのお',
		water: 'みず',
		electric: 'でんき',
		grass: 'くさ',
		ice: 'こおり',
		fighting: 'かくとう',
		poison: 'どく',
		ground: 'じめん',
		flying: 'ひこう',
		psychic: 'エスパー',
		bug: 'むし',
		rock: 'いわ',
		ghost: 'ゴースト',
		dragon: 'ドラゴン',
		dark: 'あく',
		steel: 'はがね',
		fairy: 'フェアリー'
	};

	// 3. Semantic Tokens
	colorCategories = [
		{
			title: 'Text',
			tokens: [
				{ name: 'text-primary', class: 'text-text-primary', hex: SemanticColors.text.primary, desc: 'メインコンテンツ、見出し' },
				{ name: 'text-secondary', class: 'text-text-secondary', hex: SemanticColors.text.secondary, desc: 'サブタイトル、補足情報' },
				{ name: 'text-tertiary', class: 'text-text-tertiary', hex: SemanticColors.text.tertiary, desc: 'プレースホルダー、無効状態' },
				{ name: 'text-inverse', class: 'text-text-inverse bg-black p-xs rounded', hex: SemanticColors.text.inverse, desc: '暗い背景上のテキスト' },
			]
		},
		{
			title: 'Background',
			tokens: [
				{ name: 'bg-canvas', class: 'bg-background-canvas border', hex: SemanticColors.background.canvas, desc: 'アプリ全体の背景' },
				{ name: 'bg-surface', class: 'bg-background-surface border', hex: SemanticColors.background.surface, desc: 'カード、モーダル、コンポーネント背景' },
				{ name: 'bg-subtle', class: 'bg-background-subtle border', hex: SemanticColors.background.subtle, desc: '二次的な背景色' },
				{ name: 'bg-overlay', class: 'bg-background-overlay border', hex: SemanticColors.background.overlay, desc: 'モーダル背景' },
			]
		},
		{
			title: 'Border',
			tokens: [
				{ name: 'border-default', class: 'border border-border-default h-2xl w-full', hex: SemanticColors.border.default, desc: '標準的な区切り線' },
				{ name: 'border-subtle', class: 'border border-border-subtle h-2xl w-full', hex: SemanticColors.border.subtle, desc: '目立たない区切り線' },
				{ name: 'border-focus', class: 'border border-border-focus h-2xl w-full', hex: SemanticColors.border.focus, desc: '入力フォーカス' },
			]
		},
		{
			title: 'Action',
			tokens: [
				{ name: 'action-primary', class: 'bg-action-primary', hex: SemanticColors.action.primary.default, desc: '主要アクション' },
				{ name: 'action-primary-hover', class: 'bg-action-primary-hover', hex: SemanticColors.action.primary.hover, desc: '主要アクション (Hover)' },
				{ name: 'action-secondary', class: 'bg-action-secondary', hex: SemanticColors.action.secondary.default, desc: '副次的アクション' },
				{ name: 'action-secondary-hover', class: 'bg-action-secondary-hover', hex: SemanticColors.action.secondary.hover, desc: '副次的アクション (Hover)' },
				{ name: 'action-ghost-hover', class: 'bg-action-ghost-hover', hex: SemanticColors.action.ghost.hover, desc: 'Ghost (Hover)' },
			]
		}
	];

	// Structure Tokens
	structureCategories = [
		{
			title: 'Border Radius',
			type: 'radius',
			tokens: [
				{ name: 'rounded-none', class: 'rounded-none', desc: `直角 (${RadiusScale.none})` },
				{ name: 'rounded-sm', class: 'rounded-sm', desc: `小 (${RadiusScale.sm}) - デフォルト` },
				{ name: 'rounded-full', class: 'rounded-full', desc: `円形 (${RadiusScale.full})` },
			]
		},
		{
			title: 'Border Width',
			type: 'border',
			tokens: [
				{ name: 'border', class: 'border', desc: 'デフォルト (2px)。レトロな太さ。' },
			]
		},
		{
			title: 'Z-Index',
			type: 'z-index',
			tokens: [
				{ name: 'z-base', class: 'z-base', desc: `通常コンテンツ (${ZIndexScale.base})` },
				{ name: 'z-modal', class: 'z-modal', desc: `ダイアログ (${ZIndexScale.modal})` },
			]
		},
		{
			title: 'Spacing',
			type: 'spacing',
			tokens: [
				{ name: 'gap-xs', class: 'gap-xs', desc: `最小間隔 (${SpacingScale.xs})。アイコンとテキストなど。` },
				{ name: 'gap-sm', class: 'gap-sm', desc: `狭い間隔 (${SpacingScale.sm})。関連要素同士。` },
				{ name: 'gap-md', class: 'gap-md', desc: `中程度 (${SpacingScale.md})。リストアイテム間など。` },
				{ name: 'gap-lg', class: 'gap-lg', desc: `広い間隔 (${SpacingScale.lg})。セクション内区切り。` },
				{ name: 'gap-xl', class: 'gap-xl', desc: `大きな間隔 (${SpacingScale.xl})。カードUIの間隔など` },
				{ name: 'gap-2xl', class: 'gap-2xl', desc: `最大間隔 (${SpacingScale['2xl']})。全体の外枠など。` },
			]
		}
	];

	// 4. Icons
	uiIcons = [
		{ name: 'settings', desc: '設定' },
		{ name: 'help-circle', desc: 'ヘルプ' },
		{ name: 'share-2', desc: '共有' },
		{ name: 'info', desc: '情報' },
		{ name: 'x', desc: '閉じる' },
		{ name: 'circle', desc: '未完了/通常' },
		{ name: 'menu', desc: 'メニュー' },
		{ name: 'chevron-right', desc: '次へ/詳細' }
	];

	// 6. UI Components

	// Buttons
	buttons = [
		{ name: 'Primary', desc: '主要なアクション', label: 'Confirm', variant: 'primary', meta: '<button pb-button ... variant="primary">' },
		{ name: 'Outline', desc: '背景が透明な枠線ボタン', label: 'Back', variant: 'outline', meta: 'variant="outline"' },
		{ name: 'Disabled', desc: '無効状態', label: 'Disabled', variant: 'primary', disabled: true, meta: '[disabled]="true"' }
	];

	// Dialog Text
	dialogText = {
		title: 'Modal',
		body: 'Modalのヘッダー、ボディ、フッターのスタイルを確認するためのプレビューです。',
		close: 'Close',
		confirm: 'Confirm',
		exampleTitle: 'Example Modal',
		exampleBody1: 'ヘルプ、設定、またはゲーム結果に使用される標準的なモーダルダイアログです。',
		exampleBody2: 'バックグラウンド、ボディエリア、およびオプションのヘッダーとフッターがあります。'
	};

	cardText = {
		filled: {
			name: 'Record Card (Filled)',
			desc: '対戦履歴 (値あり)'
		},
		empty: {
			name: 'Record Card (Empty)',
			desc: '対戦履歴 (プレースホルダー)'
		},
		liveModal: {
			name: 'Live Modal Trigger',
			desc: '実際のモーダルを開くボタン'
		},
		staticModal: {
			name: 'Static Modal UI',
			desc: 'モーダルのスタイルプレビュー'
		}
	};

	labelChips: LabelChipItem[] = [
		{
			title: 'Small',
			items: [
				{ name: 'Text Only', desc: 'シンプルなスタイル', meta: 'label="ほのお" type="fire"', props: { label: 'ほのお', type: 'fire', radius: 'sm' } },
				{ name: 'Icon + Text', desc: '情報量がほしいとき、十分な横幅があるとき', meta: 'label="みず" type="water" [withIcon]="true"', props: { label: 'みず', type: 'water', withIcon: true, radius: 'sm' } },
				{ name: 'Icon Rectangle', desc: 'スペースがないとき、狭い領域にたくさん並べたいとき', meta: 'type="grass" [iconOnly]="true"', props: { type: 'grass', iconOnly: true, radius: 'sm' } },
				{ name: 'Icon Rounded', desc: 'Iconが丸いスタイル', meta: 'type="electric" [iconOnly]="true" radius="full"', props: { type: 'electric', radius: 'full', iconOnly: true } }
			]
		},
		{
			title: 'Medium',
			items: [
				{ name: 'Text Only', desc: 'シンプルなスタイル', meta: 'label="ほのお" type="fire" size="m"', props: { label: 'ほのお', type: 'fire', size: 'm', radius: 'sm' } },
				{ name: 'Icon + Text', desc: '情報量がほしいとき、十分な横幅があるとき', meta: 'label="みず" type="water" [withIcon]="true" size="m"', props: { label: 'みず', type: 'water', withIcon: true, size: 'm', radius: 'sm' } },
				{ name: 'Icon Rectangle', desc: 'スペースがないとき、狭い領域にたくさん並べたいとき', meta: 'type="grass" [iconOnly]="true" size="m"', props: { type: 'grass', iconOnly: true, size: 'm', radius: 'sm' } },
				{ name: 'Icon Rounded', desc: 'Iconが丸いスタイル', meta: 'type="electric" [iconOnly]="true" size="m" radius="full"', props: { type: 'electric', size: 'm', radius: 'full', iconOnly: true } }
			]
		}
	];

	readonly icons = {
		settings: Settings,
		help: HelpCircle,
		share: Share2,
		info: Info
	};
}
