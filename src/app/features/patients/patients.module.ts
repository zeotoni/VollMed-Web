import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { PatientRegisterComponent } from './pages/patient-register/patient-register.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientListComponent } from './pages/patient-list/patient-list.component';

@NgModule({
  declarations: [PatientRegisterComponent, PatientListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
  ],
})
export class PatientsModule {}
