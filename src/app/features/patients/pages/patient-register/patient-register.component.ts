import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
})
export class PatientRegisterComponent {
  modalText = 'Cadastro realizado com sucesso!';
  @ViewChild('modal') modalWarning!: ElementRef;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]),
  });

  onSubmit() {
    console.log('Formulário enviado:', this.form.value);
  }

  btnState() {
    return this.form.valid ? 'primary' : 'disabled';
  }
}
