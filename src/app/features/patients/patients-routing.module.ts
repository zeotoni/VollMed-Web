import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientRegisterComponent } from './pages/patient-register/patient-register.component';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent,
  },
  {
    path: 'register',
    component: PatientRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
