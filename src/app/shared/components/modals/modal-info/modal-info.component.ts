import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent {
  @Input() text!: string;
  @Input() title!: string;

  @ViewChild('modalInfo') modal!: ElementRef;

  nativeElement: HTMLElement;

  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  close() {
    this.modal.nativeElement.close();
  }
}
