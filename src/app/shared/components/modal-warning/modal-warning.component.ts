import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.scss'],
})
export class ModalWarningComponent {
  @Input() text!: string;
  @Input() title!: string;

  @ViewChild('modalWarning') modal!: ElementRef;

  nativeElement: HTMLElement;

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  close() {
    this.modal.nativeElement.close();
  }
}
