import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pb-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: {
    '[class]': 'hostClasses'
  }
})
export class CardComponent {
  @Input() type: 'default' | 'compact-row' | 'select-type' = 'default';
  @Input() background: 'white' | 'gray' = 'white';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' | 'auto' = 'auto';
  @Input() borderThick: boolean = false;

  @Input() title?: string;
  @Input() description?: string;

  get hostClasses(): string {
    const classes: string[] = [this.type, this.background];
    if (this.padding !== 'auto') {
      classes.push(`p-${this.padding}`);
    }
    if (this.borderThick) {
      classes.push('border-thick');
    }
    return classes.join(' ');
  }
}
