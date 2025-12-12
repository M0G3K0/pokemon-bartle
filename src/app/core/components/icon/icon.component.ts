import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon Component
 * 
 * A reusable icon component using SVG assets from assets/icons/ui.
 * 
 * Usage:
 * ```html
 * <pb-icon name="settings"></pb-icon>
 * <pb-icon name="help-circle" size="lg"></pb-icon>
 * <pb-icon name="x" [customSize]="32"></pb-icon>
 * ```
 */
@Component({
	selector: 'pb-icon',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
	host: {
		'[class]': 'hostClasses',
		'[style.width.px]': 'getSize()',
		'[style.height.px]': 'getSize()'
	}
})
export class IconComponent {
	/** Icon name from assets/icons/ui directory (without .svg extension) */
	@Input() name = 'circle';

	/** Predefined size: sm (16px), md (20px), lg (24px), xl (32px) */
	@Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

	/** Custom size in pixels (overrides predefined size) */
	@Input() customSize?: number;

	get hostClasses(): string {
		return `size-${this.size}`;
	}

	getSize(): number {
		if (this.customSize) {
			return this.customSize;
		}

		const sizeMap = {
			sm: 16,
			md: 20,
			lg: 24,
			xl: 32
		};

		return sizeMap[this.size];
	}

	get iconPath(): string {
		return `assets/icons/ui/${this.name}.svg`;
	}
}
