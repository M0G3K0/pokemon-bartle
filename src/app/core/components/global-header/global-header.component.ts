import { Component, Input } from '@angular/core';

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
}
