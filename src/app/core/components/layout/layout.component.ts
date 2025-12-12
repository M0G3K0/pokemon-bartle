import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'pb-layout',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './layout.component.html'
})
export class LayoutComponent {
	// Layout type
	@Input() type: 'grid' | 'stack' | 'flex' = 'grid';

	// Number of columns (Grid only)
	@Input() columns = 1;
	@Input() lgColumns: number | undefined;

	// Direction (Flex/Stack only)
	@Input() direction: 'row' | 'column' = 'column'; // Default for stack is usually column

	// Gap size
	@Input() gap: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 's' | 'm' | 'l' | 'none' = 'xl';

	// Alignment (Flex only)
	@Input() align: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';
	@Input() justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' = 'start';

	@Input() inline = false;

	layoutClass = computed(() => {
		// Gap mapping
		const gapMap: Record<string, string> = {
			'none': 'gap-0',
			'xs': 'gap-xs',
			'sm': 'gap-sm',
			'md': 'gap-md',
			'lg': 'gap-lg',
			'xl': 'gap-xl',
			'2xl': 'gap-2xl',
			// Legacy aliases
			's': 'gap-sm',
			'm': 'gap-lg',
			'l': 'gap-xl'
		};
		const gapClass = gapMap[this.gap] || 'gap-xl';

		if (this.type === 'grid') {
			const display = this.inline ? 'inline-grid' : 'grid';
			const colClass = `grid-cols-${this.columns}`;
			const lgColClass = this.lgColumns ? `lg:grid-cols-${this.lgColumns}` : '';
			return `${display} ${colClass} ${lgColClass} ${gapClass}`;
		} else if (this.type === 'stack') {
			// Stack implies flex column usually, or just vertical spacing
			const display = this.inline ? 'inline-flex' : 'flex';
			return `${display} flex-col ${gapClass}`;
		} else {
			// Flex
			const display = this.inline ? 'inline-flex' : 'flex';
			const dirClass = this.direction === 'column' ? 'flex-col' : 'flex-row';
			const alignClass = `items-${this.align}`;
			const justifyClass = `justify-${this.justify}`;
			return `${display} ${dirClass} ${alignClass} ${justifyClass} ${gapClass}`;
		}
	});

	get gridStyle(): string {
		if (this.type === 'grid') {
			const colSize = this.inline ? 'auto' : 'minmax(0, 1fr)';
			return `grid-template-columns: repeat(${this.columns}, ${colSize});`;
		}
		return '';
	}
}
