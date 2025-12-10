import { Component, computed, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../core/components/layout/layout.component';
import { GlobalHeaderComponent } from '../../core/components/global-header/global-header.component';
import { CardComponent } from '../../core/components/card/card.component';
import { IconButtonComponent } from '../../core/components/icon-button/icon-button.component';
import { ChipComponent } from '../../core/components/chip/chip.component';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { ButtonComponent } from '../../core/components/button/button.component';
import { ToastComponent } from '../../core/components/toast/toast.component';

import { GameEngineService, PokemonType, ALL_TYPES } from '../../core/services/game-engine.service';
import { AudioService } from '../../core/services/audio.service';
import { IconComponent } from "../../core/components/icon/icon.component";
import { SwitchComponent } from '../../core/components/switch/switch.component';

@Component({
  selector: 'pb-game',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    GlobalHeaderComponent,
    CardComponent,
    IconButtonComponent,
    ChipComponent,
    ModalComponent,
    ButtonComponent,
    ToastComponent,
    IconComponent,
    SwitchComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  private gameEngine = inject(GameEngineService);
  audioService = inject(AudioService); // Public for template access
  private cdr = inject(ChangeDetectorRef);

  // Game Settings & State
  difficulty = signal<'easy' | 'normal' | 'master'>('normal');
  tempDifficulty = signal<'easy' | 'normal' | 'master'>('normal'); // For Modal state
  mode = signal<'attack' | 'solve'>('attack');

  // Turn State
  currentTurn = signal(1);
  maxTurns = computed(() => this.difficulty() === 'master' ? 6 : 10);
  isGameOver = signal(false);
  gameResult = signal<'win' | 'lose' | null>(null);

  // Secret Target
  target: PokemonType[] = [];

  selectedType1 = signal<PokemonType | null>(null);
  selectedType2 = signal<PokemonType | null>(null);

  // Staging Preview Outcome
  stagingOutcome = signal<'critical' | 'effective' | 'neutral' | 'resisted' | 'immune' | 'perfect' | 'partial' | 'none' | null>(null);
  stagingMultiplier = signal<number | null>(null); // For easy mode
  isShowingFeedback = signal(false);
  isFeedbackFadingOut = signal(false); // Controls fade-out animation

  // Computed staging background color
  stagingBackgroundColor = computed(() => {
    const outcome = this.stagingOutcome();
    if (!outcome) return null;

    // Map outcomes to color tokens (using semantic tokens)
    if (outcome === 'perfect' || outcome === 'critical' || outcome === 'effective') {
      return 'var(--pb-result-win-bg)';
    } else if (outcome === 'partial' || outcome === 'neutral') {
      return 'var(--pb-result-lose-bg)';
    } else {
      return 'var(--pb-background-subtle)';
    }
  });

  // UI State
  isHelpOpen = signal(false);
  isSettingsOpen = signal(false);
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error' | 'info'>('success');

  // Data
  types: PokemonType[] = ALL_TYPES;

  typeLabels: Record<PokemonType, string> = {
    normal: 'ノーマル', fire: 'ほのお', water: 'みず', electric: 'でんき', grass: 'くさ', ice: 'こおり',
    fighting: 'かくとう', poison: 'どく', ground: 'じめん', flying: 'ひこう', psychic: 'エスパー', bug: 'むし',
    rock: 'いわ', ghost: 'ゴースト', dragon: 'ドラゴン', dark: 'あく', steel: 'はがね', fairy: 'フェアリー'
  };

  history: ({ mode: string, type: string, outcome: string } | null)[] = [];

  memoData = {
    critical: [] as PokemonType[],
    effective: [] as PokemonType[],
    neutral: [] as PokemonType[],
    resisted: [] as PokemonType[],
    immune: [] as PokemonType[]
  };

  chipStates: Record<string, 'none' | 'cross' | 'circle'> = {};

  ngOnInit() {
    this.initializeChipStates();
    this.startGame();
  }

  initializeChipStates() {
    this.chipStates = this.types.reduce((acc, t) => {
      acc[t] = 'none';
      return acc;
    }, {} as Record<string, 'none' | 'cross' | 'circle'>);
  }

  startGame() {
    // Stop win sound when starting a new game
    this.audioService.stopWinSound();

    this.target = this.gameEngine.generateTarget();
    this.history = Array(this.maxTurns()).fill(null); // Reset history based on max turns
    this.currentTurn.set(1);
    this.isGameOver.set(false);
    this.gameResult.set(null);
    this.selectedType1.set(null);
    this.selectedType2.set(null);
    this.mode.set('attack');

    // Reset Memo
    this.memoData = {
      critical: [], effective: [], neutral: [], resisted: [], immune: []
    };
    this.initializeChipStates();

    console.log('Game Started. Target:', this.target); // Debug
  }

  // Settings Logic
  toggleSettings() {
    if (!this.isSettingsOpen()) {
      // Open: Sync temp with current
      this.tempDifficulty.set(this.difficulty());
      this.isSettingsOpen.set(true);
    } else {
      this.cancelSettings();
    }
  }

  cancelSettings() {
    this.isSettingsOpen.set(false);
  }

  applySettings() {
    this.difficulty.set(this.tempDifficulty());
    this.startGame(); // Restart on difficulty change
    this.isSettingsOpen.set(false);
  }


  // Actions
  selectType(type: PokemonType) {
    if (this.isGameOver()) return;
    if (this.isShowingFeedback()) return; // Prevent selection during feedback

    if (this.mode() === 'attack') {
      if (this.selectedType1() === type) {
        this.selectedType1.set(null);
      } else {
        this.selectedType1.set(type);
      }
      this.selectedType2.set(null);
    } else {
      if (this.selectedType1() === type) {
        this.selectedType1.set(null);
      } else if (this.selectedType2() === type) {
        this.selectedType2.set(null);
      } else if (!this.selectedType1()) {
        this.selectedType1.set(type);
      } else if (!this.selectedType2()) {
        this.selectedType2.set(type);
      } else {
        // Both slots are filled, shift: type1 -> null, type2 -> type1, new -> type2
        this.selectedType1.set(this.selectedType2());
        this.selectedType2.set(type);
      }
    }
  }

  setMode(m: 'attack' | 'solve') {
    if (this.isGameOver()) return;
    if (this.isShowingFeedback()) return; // Prevent mode switch during feedback
    this.mode.set(m);
    // Clear second type when switching to attack mode
    if (m === 'attack' && this.selectedType2()) {
      this.selectedType2.set(null);
    }
  }

  toggleChipState(type: PokemonType) {
    const current = this.chipStates[type];
    const sequence: Record<string, 'none' | 'cross' | 'circle'> = {
      'none': 'circle', // Spec: None -> Circle -> Cross -> None? User said Circle/Cross
      'circle': 'cross',
      'cross': 'none'
    };
    // Immutable update to trigger change detection
    this.chipStates = {
      ...this.chipStates,
      [type]: sequence[current] || 'circle'
    };
  }

  updateStagingPreview() {
    const type1 = this.selectedType1();
    const type2 = this.selectedType2();

    // Clear if nothing selected
    if (!type1) {
      this.stagingOutcome.set(null);
      return;
    }

    if (this.mode() === 'solve') {
      // Solve mode - check solution match
      const guess: PokemonType[] = type2 ? [type1, type2] : [type1];
      const result = this.gameEngine.checkSolution(guess, this.target);

      // Map emoji to outcome type for solve mode
      if (result === '🟩') {
        this.stagingOutcome.set('perfect'); // Perfect match - green square
      } else if (result === '🟨') {
        this.stagingOutcome.set('partial'); // Partial match - yellow square
      } else {
        this.stagingOutcome.set('none'); // No match - black square (⬛)
      }
      this.stagingMultiplier.set(null); // No multiplier in solve mode
    } else {
      // Attack mode - check effectiveness
      const multiplier = this.gameEngine.calculateEffectiveness(type1, this.target);
      const label = this.gameEngine.getEffectivenessLabel(multiplier);
      this.stagingOutcome.set(label as any);
      this.stagingMultiplier.set(multiplier); // Store multiplier for easy mode
    }
  }

  submitAction() {
    if (this.isGameOver()) return;
    if (this.isShowingFeedback()) return; // Prevent submit during feedback

    const type1 = this.selectedType1();
    const type2 = this.selectedType2();

    // Check validity
    if (!type1) return; // Both modes require at least type1

    // Show feedback immediately upon submission
    this.updateStagingPreview();
    this.cdr.detectChanges();

    // Find current empty slot (should correspond to currentTurn - 1)
    const index = this.currentTurn() - 1;
    if (index >= this.history.length) return; // Should not happen

    let typeLabel: string = type1!; // Store raw key
    let outcome = '';

    // Process Logic
    if (this.mode() === 'solve') {
      const guess: PokemonType[] = type2 ? [type1!, type2] : [type1!];

      // Construct label
      typeLabel = type2 ? `${type1}/${type2}` : `${type1}`;

      const result = this.gameEngine.checkSolution(guess, this.target);
      outcome = result;

      // Win Condition
      if (result === '🟩') {
        this.isGameOver.set(true);
        this.gameResult.set('win');
        // Play win sound
        this.audioService.playWinSound();
      } else if (this.difficulty() === 'master') {
        // Master Mode: One-Shot Answer Rule
        this.isGameOver.set(true);
        this.gameResult.set('lose');
      }

    } else {
      const multiplier = this.gameEngine.calculateEffectiveness(type1!, this.target);
      const label = this.gameEngine.getEffectivenessLabel(multiplier);

      outcome = label; // critical, effective, etc.

      // Auto-Memo
      this.updateMemo(type1!, label);
    }

    // Update History
    const newHistory = [...this.history];
    newHistory[index] = {
      mode: this.mode(),
      type: typeLabel,
      outcome: outcome
    };
    this.history = newHistory;

    // Turn Handling
    if (!this.isGameOver()) {
      const nextTurn = this.currentTurn() + 1;
      if (nextTurn > this.maxTurns()) {
        this.isGameOver.set(true);
        this.gameResult.set('lose');
      } else {
        this.currentTurn.set(nextTurn);
      }
    }

    // Show feedback for 0.5 second (200ms visible + 300ms fade-out)
    this.isShowingFeedback.set(true);
    this.isFeedbackFadingOut.set(false);

    // Start fade-out after 200ms
    setTimeout(() => {
      this.isFeedbackFadingOut.set(true);
      this.cdr.detectChanges();
    }, 200);

    // Clear after full 0.5 second (including fade-out animation)
    setTimeout(() => {
      this.selectedType1.set(null);
      this.selectedType2.set(null);
      this.stagingOutcome.set(null);
      this.stagingMultiplier.set(null);
      this.isShowingFeedback.set(false);
      this.isFeedbackFadingOut.set(false);
      this.cdr.detectChanges();
    }, 500);
  }

  updateMemo(type: PokemonType, outcome: string) {
    // 1. Remove from all lists first (Deduplication / State Update)
    // We treat 'immune', 'resisted', 'neutral', 'effective', 'critical' as the keys
    const keys: (keyof typeof this.memoData)[] = ['immune', 'resisted', 'neutral', 'effective', 'critical'];

    let newData = { ...this.memoData };

    keys.forEach(k => {
      newData[k] = newData[k].filter(t => t !== type);
    });

    // 2. Add to the new list if it matches a category
    if (outcome in newData) {
      const key = outcome as keyof typeof this.memoData;
      newData[key] = [...newData[key], type];
    }

    // 3. Assign back to trigger CD if object ref checks are used in template
    this.memoData = newData;
  }

  toggleHelp() {
    this.isHelpOpen.update(v => !v);
  }

  // Template Helpers
  getTypeLabel(key: string): string {
    return this.typeLabels[key as PokemonType] || key;
  }

  getSplitTypes(compositeKey: string): string[] {
    return compositeKey.split('/');
  }

  shareResult() {
    const result = this.gameResult();
    const turnCount = this.history.filter(h => h !== null).length;

    let statusLine = '';
    if (result === 'win') {
      statusLine = `Win! ${turnCount}/${this.maxTurns()}`;
    } else {
      statusLine = `Lose... X/${this.maxTurns()}`;
    }

    const title = 'Pokémon Bartle';

    const rows = [];
    // We always have 5 rows visually (grid-rows-5)
    for (let i = 0; i < 5; i++) {
      const left = this.history[i];
      const right = this.history[i + 5];

      if (!left) break; // Optimization

      let line = this.formatMove(left);
      if (right) {
        line += ` | ${this.formatMove(right)}`;
      }
      rows.push(line);
    }

    const rowsStr = rows.join('\n');
    const url = '\nhttps://pokemon-bartle.web.app';
    const shareText = `${title}\n${statusLine}\n${rowsStr}${url}`;

    this.copyToClipboard(shareText);
  }

  // Robust Clipboard Copy with Fallback
  private copyToClipboard(text: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('🎉 コピーしました！', 'success');
      }).catch(err => {
        console.warn('Clipboard API failed, retrying with fallback', err);
        this.fallbackCopyTextToClipboard(text);
      });
    } else {
      this.fallbackCopyTextToClipboard(text);
    }
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Ensure strict style to avoid layout shifts
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showToast('🎉 コピーしました！', 'success');
      } else {
        this.showToast('コピーに失敗しました', 'error');
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
      this.showToast('コピーに失敗しました', 'error');
    }

    document.body.removeChild(textArea);
  }

  // Format move helper - moved to method for scope access
  formatMove(h: { mode: string, type: string, outcome: string } | null): string {
    if (!h) return '';
    const modeIcon = h.mode === 'attack' ? '⚔' : '❓';
    const types = h.type.split('/').map(t => this.getTypeShortLabel(t as PokemonType));
    const typeDisplay = types.length === 1 ? types[0] + '　' : types.join('');

    let outcomeDisplay = h.outcome;
    if (h.outcome === 'critical' || h.outcome === 'effective') outcomeDisplay = '⭕';
    else if (h.outcome === 'neutral') outcomeDisplay = '⚪';
    else if (h.outcome === 'resisted') outcomeDisplay = '🔺';
    else if (h.outcome === 'immune') outcomeDisplay = '✖';
    // Solve mode icons are already emoji in outcome

    return `${modeIcon}${typeDisplay}▶${outcomeDisplay}`;
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.cdr.detectChanges(); // Trigger change detection immediately
    setTimeout(() => {
      this.toastMessage.set(null);
      this.cdr.detectChanges();
    }, 3000);
  }

  getTypeShortLabel(type: PokemonType): string {
    // Map full names to single Kanji for sharing compactness
    const map: Record<string, string> = {
      normal: '普', fire: '炎', water: '水', electric: '電', grass: '草', ice: '氷',
      fighting: '闘', poison: '毒', ground: '地', flying: '飛', psychic: '超', bug: '虫',
      rock: '岩', ghost: '霊', dragon: '竜', dark: '悪', steel: '鋼', fairy: '妖'
    };
    return map[type] || type.substring(0, 1).toUpperCase();
  }
}
