import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProfileDeactivationService } from './../../../services/profile-deactivation.service';

import { DoctorService } from 'app/features/doctors/services/doctor.service';
import { ProfileCard } from 'app/shared/models/profile-card';
import { DoctorListService } from '../../../../features/doctors/services/doctor-list.service';

@Component({
  selector: 'app-modal-deactivation',
  templateUrl: './modal-deactivation.component.html',
  styleUrls: ['./modal-deactivation.component.scss'],
})
export class ModalDeactivationComponent {
  @Input() profile!: ProfileCard;
  modalTitle!: string;
  modalText!: string;

  @ViewChild('modalInfo') modalInfo!: ElementRef;
  @ViewChild('modalDeactivation') deactivationModal!: ElementRef;
  nativeElement: HTMLElement;

  constructor(
    private element: ElementRef,
    private doctorService: DoctorService,
    private doctorListService: DoctorListService,
    private profileDeactivationService: ProfileDeactivationService,
  ) {
    this.nativeElement = element.nativeElement;
  }

  deactivate(): void {
    this.profileDeactivationService
      .deactivateProfile(this.profile.id, this.profile.profileType)
      .subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError(),
      });
  }

  handleError(): void {
    this.modalTitle = 'Não foi possível desativar esse perfil';
    this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
    this.closeModal();
    this.openModalWarning();
  }

  handleSuccess() {
    this.closeModal();
    this.modalText = 'Perfil desativado com sucesso!';
    this.openModalWarning();
    setInterval(() => {
      this.doctorService.getDoctorList(0).subscribe((list) => {
        this.doctorListService.setUpdatedList(list);
      });
    }, 2000);
  }

  openModalWarning(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.deactivationModal.nativeElement.close();
  }
}
