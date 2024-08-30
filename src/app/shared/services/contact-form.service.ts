import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  createContactForm(values?: { email?: string; phone?: string }): FormGroup {
    return new FormGroup({
      email: new FormControl(values?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(values?.phone || '', [
        Validators.required,
        Validators.pattern(/^\d{10,11}$/),
      ]),
    });
  }
}
