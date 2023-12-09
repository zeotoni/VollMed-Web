import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() btnText!: string;

  signUpForm!: FormGroup;

  states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  specialties = [
    'Ortopedista',
    'Cardiologista',
    'Ginecologista',
    'Dermatologista',
  ];

  ngOnInit(): void {
    this.signUpForm = new FormBuilder().group({
      nome: ['', [Validators.required]],
      especialidade: ['', [Validators.required]],
      crm: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      rua: ['', [Validators.required]],
      numero: [''],
      complemento: [''],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    });
  }

  dataSignUp() {
    console.log(this.signUpForm.value);
  }

  btnState() {
    return this.signUpForm.valid ? 'primary' : 'disabled';
  }
}
