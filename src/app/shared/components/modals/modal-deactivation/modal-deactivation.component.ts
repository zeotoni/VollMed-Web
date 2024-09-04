import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ProfileDeactivationService } from './../../../services/profile-deactivation.service';

import { ProfileCard } from 'app/shared/models/profile-card';

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
  @ViewChild('modalDeactivation') modalDeactivation!: ElementRef;
  nativeElement: HTMLElement;

  constructor(
    private element: ElementRef,
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

  handleSuccess() {
    this.closeModal();
    this.modalText = 'Perfil desativado com sucesso!';
    this.openModalInfo();
  }

  handleError(): void {
    this.modalTitle = 'Não foi possível desativar esse perfil';
    this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
    this.closeModal();
    this.openModalInfo();
  }

  openModalInfo(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalDeactivation.nativeElement.close();
  }
}
