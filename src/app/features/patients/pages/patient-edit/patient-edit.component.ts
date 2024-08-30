import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressFormService } from 'app/shared/services/address-form.service';
import { PatientEdit } from '../../models/patient';
import { ContactFormService } from './../../../../shared/services/contact-form.service';
import { PatientService } from './../../services/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent implements OnInit {
  modalTitle!: string;
  modalText!: string;
  patientId!: number;

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    cpf: new FormControl(),
  });

  @ViewChild('modal') modalInfo!: ElementRef;

  constructor(
    private patientService: PatientService,
    private contactFormService: ContactFormService,
    private addressFormService: AddressFormService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.params['id']);

    this.patientService.getPatientById(this.patientId).subscribe((patient) => {
      this.form = new FormGroup({
        name: new FormControl(patient.name, [
          Validators.required,
          Validators.minLength(5),
        ]),
        cpf: new FormControl(patient.cpf, [
          Validators.required,
          Validators.pattern(/^\d{11}$/),
        ]),
        contact: this.contactFormService.createContactForm(patient.contact),
        address: this.addressFormService.createAddressForm(patient.address),
      });
      this.form.get('cpf')?.disable();
      this.form.get('contact')?.get('email')?.disable();
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.dirty) {
      const updatedData: PatientEdit = {
        id: this.patientId,
        ...this.form.value,
      };

      this.patientService.updatePatient(updatedData).subscribe({
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
  }

  openModal(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalInfo.nativeElement.firstChild.close();
  }

  btnState(): 'primary' | 'disabled' {
    return this.form.valid ? 'primary' : 'disabled';
  }
}
