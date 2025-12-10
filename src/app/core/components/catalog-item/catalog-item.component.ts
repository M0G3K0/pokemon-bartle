import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pb-catalog-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-item.component.html',
  styleUrl: './catalog-item.component.scss',
  host: {
    '[class]': 'hostClasses'
  }
})
export class CatalogItemComponent {
  @Input() name?: string;
  @Input() description?: string;
  @Input() meta?: string;
  @Input() variant: 'default' | 'compact' = 'default';

  // Optional default preview inputs
  @Input() defaultColorClass: string = '';
  @Input() defaultColorHex: string = '';

  get hostClasses(): string {
    const classes: string[] = [this.variant];
    return classes.join(' ');
  }
}
