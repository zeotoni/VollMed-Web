import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddressFormService {
  createAddressForm(values?: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    postalCode: string;
  }): FormGroup {
    return new FormGroup({
      street: new FormControl(values?.street || '', [Validators.required]),
      number: new FormControl(values?.number || ''),
      complement: new FormControl(values?.complement || ''),
      city: new FormControl(values?.city || '', [Validators.required]),
      state: new FormControl(values?.state || '', [Validators.required]),
      postalCode: new FormControl(values?.postalCode || '', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
    });
  }
}
