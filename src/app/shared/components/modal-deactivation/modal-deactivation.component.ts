import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Doctor } from 'app/features/doctors/models/doctor';
import { DoctorService } from 'app/features/doctors/services/doctor.service';
import { DoctorListService } from '../../../features/doctors/services/doctor-list.service';

@Component({
  selector: 'app-modal-deactivation',
  templateUrl: './modal-deactivation.component.html',
  styleUrls: ['./modal-deactivation.component.scss'],
})
export class ModalDeactivationComponent {
  @Input() doctor!: Doctor;
  modalTitle!: string;
  modalText!: string;

  @ViewChild('modalWarning') modalWarning!: ElementRef;
  @ViewChild('modalDeactivation') deactivationModal!: ElementRef;
  nativeElement: HTMLElement;

  constructor(
    private element: ElementRef,
    private doctorService: DoctorService,
    private doctorListService: DoctorListService,
  ) {
    this.nativeElement = element.nativeElement;
  }

  deactivate(): void {
    this.doctorService.deleteDoctor(this.doctor.id).subscribe({
      next: () => {
        this.closeModal();
        this.modalText = 'Perfil desativado com sucesso!';
        this.openModalWarning();
        setInterval(() => {
          this.doctorService.getDoctorList(0).subscribe((list) => {
            this.doctorListService.setUpdatedList(list);
          });
        }, 2000);
      },
      error: () => {
        this.modalTitle = 'Não foi possível desativar esse perfil';
        this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
        this.closeModal();
        this.openModalWarning();
      },
    });
  }

  openModalWarning(): void {
    this.modalWarning.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.deactivationModal.nativeElement.close();
  }
}
