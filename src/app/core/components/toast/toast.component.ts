import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { trigger, transition, style, animate } from '@angular/animations';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
	selector: 'pb-toast',
	standalone: true,
	imports: [CommonModule, IconButtonComponent],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
	animations: [
		trigger('slideIn', [
			transition(':enter', [
				style({ transform: 'translateY(100%)', opacity: 0 }),
				animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
			]),
			transition(':leave', [
				animate('200ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
			])
		])
	],
	host: {
		'[class]': 'hostClasses',
		'[@slideIn]': 'true'
	}
})
export class ToastComponent implements OnInit {
	@Input() message = '';
	@Input() type: ToastType = 'info';
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	@Input() duration = 3000; // Auto-dismiss after 3 seconds
	@Input() dismissible = true;

	@Output() dismiss = new EventEmitter<void>();

	get hostClasses(): string {
		const classes: string[] = [this.type];
		return classes.join(' ');
	}

	handleDismiss() {
		if (this.dismissible) {
			this.dismiss.emit();
		}
	}

	ngOnInit() {
		if (this.duration > 0) {
			setTimeout(() => {
				this.dismiss.emit();
			}, this.duration);
		}
	}
}
