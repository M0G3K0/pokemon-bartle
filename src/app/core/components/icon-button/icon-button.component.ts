import { Component, Input, Output, EventEmitter } from '@angular/core';

export type IconButtonVariant = 'ghost' | 'outline';

@Component({
  selector: 'pb-icon-button',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
  host: {
    '[class]': 'hostClasses',
    '(click)': 'action.emit()',
    '[attr.aria-label]': 'label',
    'role': 'button',
    'tabindex': '0'
  }
})
export class IconButtonComponent {
  @Input() label = 'Button';
  @Input() variant: IconButtonVariant = 'ghost';
  @Input() icon?: string;
  @Input() size: 's' | 'm' = 'm';
  @Input() shape: 'circle' | 'square' = 'circle';

  @Output() action = new EventEmitter<void>();

  get hostClasses(): string {
    const classes: string[] = [this.variant, this.shape, `size-${this.size}`];
    return classes.join(' ');
  }
}
