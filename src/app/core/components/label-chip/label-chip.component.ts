import { Component, Input, signal, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeIconComponent } from '../../../features/type-icon/type-icon.component';

@Component({
  selector: 'pb-label-chip',
  standalone: true,
  imports: [CommonModule, TypeIconComponent],
  templateUrl: './label-chip.component.html',
  styleUrl: './label-chip.component.scss',
  host: {
    '[class]': 'hostClasses',
    '[style.background-color]': 'typeBackgroundColor',
    '[style.color]': 'typeTextColor'
  }
})
export class LabelChipComponent {
  @Input() label: string = '';
  @Input() withIcon: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() radius: 'sm' | 'full' = 'sm';
  @Input() size: 's' | 'm' = 's';

  @Input() set type(value: string | undefined) {
    if (value) this._type.set(value.toLowerCase());
  }

  protected _type = signal<string | undefined>(undefined);

  get hostClasses(): string {
    const classes: string[] = [`size-${this.size}`, `radius-${this.radius}`];
    if (this.iconOnly) {
      classes.push('icon-only');
    }
    return classes.join(' ');
  }

  get typeBackgroundColor(): string | null {
    const type = this._type();
    return type ? `var(--pb-color-type-${type}-500)` : 'var(--pb-color-gray-100)';
  }

  get typeTextColor(): string {
    return this._type() ? '#ffffff' : 'var(--pb-color-gray-800)';
  }

  getType() {
    return this._type();
  }
}
