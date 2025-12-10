import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chip/chip.component';

@Component({
	selector: 'pb-section-header',
	standalone: true,
	imports: [CommonModule, ChipComponent],
	templateUrl: './section-header.component.html'
})
export class SectionHeaderComponent {
	@Input({ required: true }) title!: string;
	@Input() tagText?: string;
}
