import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ContainerComponent } from './components/container/container.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalDeactivationComponent } from './components/modal-deactivation/modal-deactivation.component';
import { ModalWarningComponent } from './components/modal-warning/modal-warning.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    ErrorMessageComponent,
    ModalWarningComponent,
    ModalDeactivationComponent,
    ContactFormComponent,
    AddressFormComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    ErrorMessageComponent,
    ModalWarningComponent,
    ModalDeactivationComponent,
    ContactFormComponent,
    AddressFormComponent,
  ],
})
export class SharedModule {}
