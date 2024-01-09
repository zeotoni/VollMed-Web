import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  @Output() medicoData = new EventEmitter<Medico>();

  signUpForm!: FormGroup;
  isInputFocused = false;

  states = Object.values(Estado).filter((value) => typeof value === 'string');

  specialties = Object.values(Especialidade).filter(
    (value) => typeof value === 'string',
  );

  constructor(
    private medicosService: MedicosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    if (id) {
      this.medicosService.getMedicoById(Number(id)).subscribe((medico) => {
        this.signUpForm.setValue({
          nome: medico.nome,
          especialidade: medico.especialidade,
          crm: medico.crm,
          email: medico.email,
          telefone: medico.telefone,
          logradouro: medico.endereco.logradouro,
          numero: medico.endereco.numero,
          complemento: medico.endereco.complemento,
          cidade: medico.endereco.cidade,
          uf: medico.endereco.uf,
          cep: medico.endereco.cep,
        });
        this.signUpForm.get('email')?.disable();
        this.signUpForm.get('crm')?.disable();
        this.signUpForm.get('especialidade')?.disable();
      });
    }

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
      id: Number(this.route.snapshot.params['id']),
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

  dataSubmit() {
    const newData: Medico = this.extractFormValues(this.signUpForm);
    this.medicoData.emit(newData);
  }

  btnState() {
    return this.signUpForm.valid ? 'primary' : 'disabled';
  }

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }
}
