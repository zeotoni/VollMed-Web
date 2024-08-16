import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../models/doctor';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.scss'],
})
export class CardDoctorComponent {
  @Input() doctor!: Doctor;
  @ViewChild('deactivationModal') modal!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  edit(): void {
    this.router.navigate([`edit`, this.doctor.id], {
      relativeTo: this.route,
    });
  }

  deactivate(): void {
    this.modal.nativeElement.firstChild.showModal();
  }
}
