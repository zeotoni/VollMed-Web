import { Component, ElementRef, ViewChild } from '@angular/core';
import { Doctor, DoctorEdit } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent {
  modalTitle!: string;
  modalText!: string;

  @ViewChild('modal') modalWarning!: ElementRef;
  constructor(private doctorService: DoctorService) {}

  onSubmit(data: Doctor) {
    const dataEdit: DoctorEdit = {
      id: data.id,
      name: data.name,
      address: data.address,
      phone: data.phone,
    };
    this.doctorService.editDoctor(dataEdit).subscribe({
      next: () => {
        this.modalText = 'Dados atualizados com sucesso!';
        this.openModal();
      },
      error: () => {
        this.modalTitle = 'Não foi possível atualizar esse perfil';
        this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
        this.openModal();
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
