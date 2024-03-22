import { Component, ElementRef, ViewChild } from '@angular/core';
import { Medico, MedicoEditar } from 'app/core/interfaces/medico';
import { MedicosService } from './../../core/services/medicos.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  modalTitle!: string;
  modalText!: string;

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
        this.modalText = 'Dados atualizados com sucesso!';
        this.openModal();
      },
      error: (err) => {
        this.modalTitle = 'Não foi possível atualizar esse perfil';
        this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
        this.openModal();
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
