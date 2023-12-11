import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidade } from 'app/core/enums/especialidade';
import { Estado } from 'app/core/enums/estados';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from './../../core/services/medicos.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() btnText!: string;

  signUpForm!: FormGroup;

  states = Object.values(Estado).filter((value) => typeof value === 'string');

  specialties = Object.values(Especialidade).filter(
    (value) => typeof value === 'string',
  );

  constructor(
    private medicosService: MedicosService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      especialidade: ['', [Validators.required]],
      crm: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.maxLength(11)]],
      logradouro: ['', [Validators.required]],
      numero: [''],
      complemento: [''],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    });
  }

  private extractFormValues(form: FormGroup): Medico {
    return {
      nome: form.get('nome')?.value,
      especialidade: form.get('especialidade')?.value,
      crm: form.get('crm')?.value,
      email: form.get('email')?.value,
      telefone: form.get('telefone')?.value,
      endereco: {
        logradouro: form.get('logradouro')?.value,
        numero: form.get('numero')?.value,
        complemento: form.get('complemento')?.value,
        cidade: form.get('cidade')?.value,
        uf: form.get('uf')?.value,
        cep: form.get('cep')?.value,
      },
    };
  }

  dataSignUp() {
    const novoMedico: Medico = this.extractFormValues(this.signUpForm);
    this.medicosService.register(novoMedico).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  btnState() {
    return this.signUpForm.valid ? 'primary' : 'disabled';
  }
}
