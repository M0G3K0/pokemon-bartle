import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'pb-sub-section-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sub-section-header.component.html'
})
export class SubSectionHeaderComponent {
	@Input({ required: true }) title!: string;
}
