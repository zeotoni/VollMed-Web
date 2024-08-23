import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { State } from 'app/shared/models/state';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';

  parentContainer = inject(ControlContainer);
  states = Object.values(State).filter((value) => typeof value === 'string');

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        street: new FormControl('', [Validators.required]),
        number: new FormControl(''),
        complement: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        postalCode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{8}$/),
        ]),
      }),
    );
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
