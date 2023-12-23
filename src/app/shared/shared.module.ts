import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { ContainerComponent } from './container/container.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
    ErrorMessageComponent,
    CardMedicoComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
    CardMedicoComponent,
  ],
})
export class SharedModule {}
