import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'app/core/interfaces/doctor';
import { DoctorService } from 'app/core/services/medicos.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
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
          this.router.navigate(['listar']);
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
