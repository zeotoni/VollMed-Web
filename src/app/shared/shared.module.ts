import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { ContainerComponent } from './components/container/container.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalDeactivationComponent } from './components/modals/modal-deactivation/modal-deactivation.component';
import { ModalInfoComponent } from './components/modals/modal-info/modal-info.component';
import { CpfPipe } from './pipes/cpf.pipe';
import { FilterByName } from './pipes/filter-by-name.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { PostalCodePipe } from './pipes/postal-code.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    ErrorMessageComponent,
    ModalInfoComponent,
    ModalDeactivationComponent,
    ContactFormComponent,
    AddressFormComponent,
    CardProfileComponent,
    CpfPipe,
    PhonePipe,
    PostalCodePipe,
    FilterByName,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    ErrorMessageComponent,
    ModalInfoComponent,
    ModalDeactivationComponent,
    ContactFormComponent,
    AddressFormComponent,
    CardProfileComponent,
    CpfPipe,
    PhonePipe,
    PostalCodePipe,
    FilterByName,
  ],
})
export class SharedModule {}
