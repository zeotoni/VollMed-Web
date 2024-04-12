import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';

@Component({
  selector: 'app-deactivation-modal',
  templateUrl: './deactivation-modal.component.html',
  styleUrls: ['./deactivation-modal.component.scss'],
})
export class DeactivationModalComponent {
  @Input() medico!: Medico;
  @ViewChild('deactivationModal') modal!: ElementRef;
  nativeElement: HTMLElement;

  constructor(private element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }
}
