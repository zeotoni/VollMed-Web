import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorEditComponent } from './pages/doctor-edit/doctor-edit.component';
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { DoctorRegisterComponent } from './pages/doctor-register/doctor-register.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorListComponent,
  },
  {
    path: 'edit/:id',
    component: DoctorEditComponent,
  },
  {
    path: 'register',
    component: DoctorRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
