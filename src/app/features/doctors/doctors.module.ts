import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorEditComponent } from './pages/doctor-edit/doctor-edit.component';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorRegisterComponent } from './pages/doctor-register/doctor-register.component';

@NgModule({
  declarations: [
    DoctorListComponent,
    DoctorEditComponent,
    DoctorRegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DoctorsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DoctorsModule {}
