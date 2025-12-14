import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pb-global-header',
  standalone: true,
  imports: [],
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() variant: 'default' | 'sticky' = 'default';

  @HostBinding('class.sticky') get isSticky() {
    return this.variant === 'sticky';
  }
}
