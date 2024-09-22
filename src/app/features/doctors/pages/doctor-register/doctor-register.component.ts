import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor';
import { Specialty } from '../../models/specialty';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss'],
})
export class DoctorRegisterComponent {
  modalText = 'Cadastro realizado com sucesso!';
  @ViewChild('modal') modalInfo!: ElementRef;

  specialties = Object.values(Specialty).filter(
    (value) => typeof value === 'string',
  );

  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    specialty: new FormControl('', [Validators.required]),
    crm: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4,6}$/),
    ]),
  });

  onSubmit() {
    const data = this.form.value as unknown as Doctor;

    this.doctorService.registerDoctor(data).subscribe({
      next: () => {
        this.openModal();
        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['doctors']);
        }, 3000);
      },
      error: (error) => {
        this.modalText = 'Não foi possível realizar o cadastro!';
        this.openModal();
        console.log('Erro ao cadastrar', error);
      },
    });
  }

  openModal(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalInfo.nativeElement.firstChild.close();
  }

  btnState(): 'primary' | 'secondary' | 'disabled' {
    return this.form.valid ? 'primary' : 'disabled';
  }
}
