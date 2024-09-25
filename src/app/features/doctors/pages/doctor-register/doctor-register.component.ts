import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Doctor } from '../../models/doctor';
import { Specialty } from '../../models/specialty';
import { DoctorListingService } from '../../services/doctor-listing.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.scss'],
})
export class DoctorRegisterComponent {
  modalText = 'Cadastro realizado com sucesso!';
  @ViewChild('modal') modalInfo!: ElementRef;

  specialties = Object.values(Specialty).filter(
    (value) => typeof value === 'string',
  );

  constructor(
    private doctorService: DoctorService,
    private doctorListingService: DoctorListingService,
    private router: Router,
  ) {}

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    specialty: new FormControl('', [Validators.required]),
    crm: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4,6}$/),
    ]),
  });

  onSubmit() {
    const data = this.form.value as unknown as Doctor;

    this.doctorService
      .registerDoctor(data)
      .pipe(
        switchMap(() => this.doctorService.getDoctorList()),
        tap((doctors) => this.doctorListingService.setUpdatedList(doctors)),
      )
      .subscribe({
        next: () => {
          this.openModal();
          setTimeout(() => {
            this.closeModal();
          }, 3000);
          this.form.reset({ specialty: '' });
        },
        error: (error) => {
          this.modalText = 'Não foi possível realizar o cadastro!';
          this.openModal();
          console.log('Erro ao cadastrar', error);
        },
      });
  }

  openModal(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalInfo.nativeElement.firstChild.close();
  }

  btnState(): 'primary' | 'secondary' | 'disabled' {
    return this.form.valid ? 'primary' : 'disabled';
  }
}
