import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'pb-switch',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss',
	host: {
		'[class.checked]': 'checked',
		'[class.disabled]': 'disabled',
		'[class.size-sm]': 'size === "sm"',
		'(click)': 'toggle()'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SwitchComponent),
			multi: true
		}
	]
})
export class SwitchComponent implements ControlValueAccessor {
	@Input() checked: boolean = false;
	@Input() disabled: boolean = false;
	@Input() label: string = '';
	@Input() size: 'md' | 'sm' = 'md';

	@Output() checkedChange = new EventEmitter<boolean>();

	private onChange: (value: boolean) => void = () => { };
	private onTouched: () => void = () => { };

	toggle() {
		if (!this.disabled) {
			this.checked = !this.checked;
			this.checkedChange.emit(this.checked);
			this.onChange(this.checked);
			this.onTouched();
		}
	}

	// ControlValueAccessor implementation
	writeValue(value: boolean): void {
		this.checked = value;
	}

	registerOnChange(fn: (value: boolean) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
