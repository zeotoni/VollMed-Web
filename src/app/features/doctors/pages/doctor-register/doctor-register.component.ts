import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss'],
})
export class DoctorRegisterComponent {
  modalText = 'Cadastro realizado com sucesso!';
  @ViewChild('modal') modalWarning!: ElementRef;
  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  onSubmit(data: Doctor) {
    this.doctorService.register(data).subscribe({
      next: () => {
        this.openModal();
        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['doctors']);
        }, 3000);
      },
      error: (err) => {
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
