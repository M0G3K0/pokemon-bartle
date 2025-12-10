import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pb-type-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-icon.component.html',
  styleUrls: ['./type-icon.component.css']
})
export class TypeIconComponent {
  @Input() set type(value: string) {
    this._type.set(value.toLowerCase());
  }

  @Input() size: 's' | 'm' = 's';

  private _type = signal<string>('normal');
  // Image URL computing
  imageUrl = computed(() => `assets/icons/types/${this._type()}.svg`);

  hostClasses = computed(() => {
    const sizeCls = this.size === 'm' ? 'w-[20px] h-[20px]' : 'w-lg h-lg';
    return `bg-type-${this._type()} ${sizeCls} rounded-full flex items-center justify-center overflow-hidden`;
  });
}
