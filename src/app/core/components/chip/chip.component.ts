import { Component, Input, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeIconComponent } from '../../../features/type-icon/type-icon.component';

@Component({
	selector: 'pb-label-chip, button[pb-action-chip]',
	standalone: true,
	imports: [CommonModule, TypeIconComponent],
	templateUrl: './chip.component.html',
	styleUrl: './chip.component.scss',
	host: {
		'[class]': 'hostClasses',
		'[style.background-color]': 'typeBackgroundColor',
		'[style.color]': 'typeTextColor',
		'(click)': 'handleClick($event)'
	}
})
export class ChipComponent {
	@Input() label = '';
	@Input() withIcon = false;
	@Input() iconOnly = false;
	@Input() radius: 'sm' | 'full' = 'sm';
	@Input() size: 'xs' | 's' | 'm' = 's';

	@Input() set type(value: string | undefined) {
		if (value) this._type.set(value.toLowerCase());
	}

	@Output() action = new EventEmitter<void>();

	protected _type = signal<string | undefined>(undefined);

	get hostClasses(): string {
		const classes: string[] = [`size-${this.size}`, `radius-${this.radius}`];
		if (this.iconOnly) {
			classes.push('icon-only');
		}
		return classes.join(' ');
	}

	get typeBackgroundColor(): string | null {
		const type = this._type();
		return type ? `var(--pb-color-type-${type}-500)` : 'var(--pb-color-gray-100)';
	}

	get typeTextColor(): string {
		return this._type() ? '#ffffff' : 'var(--pb-color-gray-800)';
	}

	handleClick(event: Event) {
		const target = event.currentTarget as HTMLElement;
		// Only emit action if this is a button (action chip)
		if (target && target.tagName === 'BUTTON') {
			this.action.emit();
		}
	}

	getType() {
		return this._type();
	}
}
