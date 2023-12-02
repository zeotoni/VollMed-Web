import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    ContainerComponent,
    HeaderComponent,
    FormComponent,
  ],
})
export class SharedModule {}