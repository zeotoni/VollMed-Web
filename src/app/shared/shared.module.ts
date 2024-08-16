import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ContainerComponent } from './components/container/container.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
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
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    ErrorMessageComponent,
    ModalWarningComponent,
    ModalDeactivationComponent,
  ],
})
export class SharedModule {}
