import { Component, Input, booleanAttribute } from '@angular/core';

export const AppButtonColors = ['primary', 'secondary', 'danger'] as const;
export type AppButtonColor = (typeof AppButtonColors)[number];

export const AppButtonPatterns = ['filled', 'outline', 'ghost'] as const;
export type AppButtonPattern = (typeof AppButtonPatterns)[number];

@Component({
  selector: 'button[pb-button], a[pb-button]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'hostClasses'
  }
})
export class ButtonComponent {
  @Input() color: AppButtonColor = 'primary';
  @Input() pattern: AppButtonPattern = 'filled';
  @Input({ transform: booleanAttribute }) disabled = false;

  get hostClasses(): string {
    const classes: string[] = [this.color, this.pattern];
    return classes.join(' ');
  }
}
