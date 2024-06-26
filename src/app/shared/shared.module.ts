import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { CardDoctorComponent } from './card-doctor/card-doctor.component';
import { ContainerComponent } from './container/container.component';
import { DeactivationModalComponent } from './deactivation-modal/deactivation-modal.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { ModalWarningComponent } from './modal-warning/modal-warning.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
    ErrorMessageComponent,
    CardDoctorComponent,
    ModalWarningComponent,
    DeactivationModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
    CardDoctorComponent,
    ModalWarningComponent,
    DeactivationModalComponent,
  ],
})
export class SharedModule {}
