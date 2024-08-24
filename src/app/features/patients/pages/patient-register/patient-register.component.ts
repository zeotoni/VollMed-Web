import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
})
export class PatientRegisterComponent {
  @ViewChild('modal') modalWarning!: ElementRef;
  modalText = 'Cadastro realizado com sucesso!';

  constructor(
    private patientService: PatientService,
    private router: Router,
  ) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value as Patient;
      this.patientService.registerPatient(data).subscribe({
        next: () => {
          this.openModal();
          setTimeout(() => {
            this.closeModal();
            this.router.navigate(['patients']);
          }, 3000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    console.error('Formulário inválido!');
  }

  btnState() {
    return this.form.valid ? 'primary' : 'disabled';
  }

  openModal(): void {
    this.modalWarning.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalWarning.nativeElement.firstChild.close();
  }
}
