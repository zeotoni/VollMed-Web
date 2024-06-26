import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'app/core/interfaces/doctor';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.scss'],
})
export class CardDoctorComponent {
  @Input() doctor!: Doctor;
  @ViewChild('deactivationModal') modal!: ElementRef;

  constructor(private router: Router) {}

  edit(): void {
    this.router.navigate([`/editar/` + this.doctor.id]);
  }

  deactivate(): void {
    this.modal.nativeElement.firstChild.showModal();
  }
}
