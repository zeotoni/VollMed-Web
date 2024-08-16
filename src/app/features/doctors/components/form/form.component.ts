import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Specialty } from 'app/features/doctors/models/specialty';
import { State } from 'app/shared/models/state';

import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() btnText!: string;
  @Output() doctorData = new EventEmitter<Doctor>();

  signUpForm!: FormGroup;
  isInputFocused = false;

  states = Object.values(State).filter((value) => typeof value === 'string');

  specialties = Object.values(Specialty).filter(
    (value) => typeof value === 'string',
  );

  constructor(
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    if (id) {
      this.doctorService.getDoctorById(Number(id)).subscribe((doctor) => {
        this.signUpForm.setValue({
          name: doctor.name,
          specialty: doctor.specialty,
          crm: doctor.crm,
          email: doctor.email,
          phone: doctor.phone,
          street: doctor.address.street,
          number: doctor.address.number,
          complement: doctor.address.complement,
          city: doctor.address.city,
          state: doctor.address.state,
          postalCode: doctor.address.postalCode,
        });
        this.signUpForm.get('email')?.disable();
        this.signUpForm.get('crm')?.disable();
        this.signUpForm.get('specialty')?.disable();
      });
    }

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      crm: ['', [Validators.required, Validators.pattern(/^\d{4,6}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      street: ['', [Validators.required]],
      number: [''],
      complement: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    });
  }

  private extractFormValues(form: FormGroup): Doctor {
    return {
      id: Number(this.route.snapshot.params['id']),
      name: form.get('name')?.value,
      specialty: form.get('specialty')?.value,
      crm: form.get('crm')?.value,
      email: form.get('email')?.value,
      phone: form.get('phone')?.value,
      address: {
        street: form.get('street')?.value,
        number: form.get('number')?.value,
        complement: form.get('complement')?.value,
        city: form.get('city')?.value,
        state: form.get('state')?.value,
        postalCode: form.get('postalCode')?.value,
      },
    };
  }

  dataSubmit() {
    const newData: Doctor = this.extractFormValues(this.signUpForm);
    this.doctorData.emit(newData);
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
