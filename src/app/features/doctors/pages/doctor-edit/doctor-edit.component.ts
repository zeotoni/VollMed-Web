import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressFormService } from 'app/shared/services/address-form.service';
import { ContactFormService } from 'app/shared/services/contact-form.service';
import { switchMap, tap } from 'rxjs';
import { DoctorEdit } from '../../models/doctor';
import { Specialty } from '../../models/specialty';
import { DoctorService } from '../../services/doctor.service';
import { DoctorListingService } from './../../services/doctor-listing.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss'],
})
export class DoctorEditComponent implements OnInit {
  modalTitle!: string;
  modalText!: string;
  doctorId!: number;

  specialties = Object.values(Specialty).filter(
    (value) => typeof value === 'string',
  );

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    specialty: new FormControl(),
    crm: new FormControl(),
  });

  @ViewChild('modal') modalInfo!: ElementRef;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private contactFormService: ContactFormService,
    private addressFormService: AddressFormService,
    private doctorListingService: DoctorListingService,
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];

    this.doctorService.getDoctorById(this.doctorId).subscribe((doctor) => {
      this.form = new FormGroup({
        name: new FormControl(doctor.name, [
          Validators.required,
          Validators.minLength(5),
        ]),
        specialty: new FormControl(doctor.specialty, [Validators.required]),
        crm: new FormControl(doctor.crm, [
          Validators.required,
          Validators.pattern(/^\d{4,6}$/),
        ]),
        contact: this.contactFormService.createContactForm(doctor.contact),
        address: this.addressFormService.createAddressForm(doctor.address),
      });
      this.form.get('specialty')?.disable();
      this.form.get('crm')?.disable();
      this.form.get('contact')?.get('email')?.disable();
    });
  }

  onSubmit() {
    if (this.form.valid && this.form.dirty) {
      const updateData: DoctorEdit = {
        id: this.doctorId,
        ...this.form.value,
      };

      this.doctorService
        .updateDoctor(updateData)
        .pipe(
          switchMap(() => this.doctorService.getDoctorList()),
          tap((doctorsList) =>
            this.doctorListingService.setUpdatedList(doctorsList),
          ),
        )
        .subscribe({
          next: () => {
            this.modalText = 'Dados atualizados com sucesso!';
            this.openModal();
          },
          error: () => {
            this.modalTitle = 'Não foi possível atualizar esse perfil';
            this.modalText = 'Ocorreu um erro,tente novamente mais tarde!';
            this.openModal();
          },
        });
    }
  }

  openModal(): void {
    this.modalInfo.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalInfo.nativeElement.firstChild.close();
  }

  btnState(): 'primary' | 'disabled' {
    return this.form.valid ? 'primary' : 'disabled';
  }
}
