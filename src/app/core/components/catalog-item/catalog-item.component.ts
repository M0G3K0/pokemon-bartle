import { Component, Input } from '@angular/core';

@Component({
  selector: 'pb-catalog-item',
  standalone: true,
  imports: [],
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
  @Input() defaultColorClass = '';
  @Input() defaultColorHex = '';

  get hostClasses(): string {
    const classes: string[] = [this.variant];
    return classes.join(' ');
  }
}
