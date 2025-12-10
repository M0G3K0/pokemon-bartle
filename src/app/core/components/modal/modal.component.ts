import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'pb-modal',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss' // Updated to scss
})
export class ModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() variant: 'default' | 'alert' = 'default'; // Maybe needed later

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
