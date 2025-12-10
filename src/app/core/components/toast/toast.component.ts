import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
	selector: 'pb-toast',
	standalone: true,
	imports: [CommonModule, IconButtonComponent],
	templateUrl: './toast.component.html',
	styleUrl: './toast.component.scss',
	host: {
		'[class]': 'hostClasses',
		'[@slideIn]': 'true'
	}
})
export class ToastComponent implements OnInit {
	@Input() message: string = '';
	@Input() type: ToastType = 'info';
	@Input() duration: number = 3000; // Auto-dismiss after 3 seconds
	@Input() dismissible: boolean = true;

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
