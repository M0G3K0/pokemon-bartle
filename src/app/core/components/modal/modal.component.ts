import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'pb-modal',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss' // Updated to scss
})
export class ModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Input() variant: 'default' | 'alert' = 'default'; // Maybe needed later

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<void>();

  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.dialogRef) {
      const dialog = this.dialogRef.nativeElement;
      if (this.isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!this.isOpen && dialog.open) {
        dialog.close();
      }
    }
  }

  closeModal() {
    this.close.emit();
  }

  onNativeClose() {
    if (this.isOpen) {
      this.close.emit();
    }
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target === this.dialogRef.nativeElement) {
      this.closeModal();
    }
  }
}
