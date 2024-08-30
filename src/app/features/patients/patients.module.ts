import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { PatientEditComponent } from './pages/patient-edit/patient-edit.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientRegisterComponent } from './pages/patient-register/patient-register.component';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  declarations: [
    PatientRegisterComponent,
    PatientListComponent,
    PatientEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
  ],
})
export class PatientsModule {}
