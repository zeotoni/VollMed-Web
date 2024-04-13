import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from 'app/core/services/medicos.service';
import { MedicoListService } from './../../core/services/medicos-list.service';

@Component({
  selector: 'app-deactivation-modal',
  templateUrl: './deactivation-modal.component.html',
  styleUrls: ['./deactivation-modal.component.scss'],
})
export class DeactivationModalComponent {
  @Input() medico!: Medico;
  modalTitle!: string;
  modalText!: string;

  @ViewChild('modalWarning') modalWarning!: ElementRef;
  @ViewChild('deactivationModal') deactivationModal!: ElementRef;
  nativeElement: HTMLElement;

  constructor(
    private element: ElementRef,
    private medicosService: MedicosService,
    private medicoListService: MedicoListService,
  ) {
    this.nativeElement = element.nativeElement;
  }

  deactivate(): void {
    this.medicosService.deleteMedico(this.medico.id).subscribe({
      next: () => {
        this.closeModal();
        this.modalText = 'Perfil desativado com sucesso!';
        this.openModalWarning();
        setInterval(() => {
          this.medicosService.getMedicosList().subscribe((list) => {
            this.medicoListService.setUpdatedList(list);
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
