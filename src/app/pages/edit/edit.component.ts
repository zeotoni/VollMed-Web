import { Component, ElementRef, ViewChild } from '@angular/core';
import { Medico, MedicoEditar } from 'app/core/interfaces/medico';
import { MedicosService } from './../../core/services/medicos.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  modalText = 'Dados atualizados com secesso!';
  @ViewChild('modal') modalWarning!: ElementRef;
  constructor(private medicosService: MedicosService) {}

  onSubmit(data: Medico) {
    const dadosEditar: MedicoEditar = {
      id: data.id,
      nome: data.nome,
      endereco: data.endereco,
      telefone: data.telefone,
    };
    this.medicosService.editMedico(dadosEditar).subscribe({
      next: () => {
        this.openModal();
        setTimeout(() => {
          this.closeModal();
        }, 3000);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  openModal(): void {
    this.modalWarning.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalWarning.nativeElement.firstChild.close();
  }
}
