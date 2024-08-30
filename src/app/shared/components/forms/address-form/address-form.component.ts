import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { State } from 'app/shared/models/state';
import { AddressFormService } from './../../../services/address-form.service';

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

  constructor(private addressFormService: AddressFormService) {}

  ngOnInit(): void {
    const addressForm = this.addressFormService.createAddressForm();
    this.parentFormGroup.setControl(this.controlKey, addressForm);
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
