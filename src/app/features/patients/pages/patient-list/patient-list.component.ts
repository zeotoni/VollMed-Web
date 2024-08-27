import { Component, OnInit } from '@angular/core';
import { ProfileCard } from 'app/shared/models/profile-card';
import { PatientService } from '../../services/patient.service';
import { ProfileListingService } from './../../../../shared/services/profile-listing.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patientList$!: { letter: string; profiles: ProfileCard[] }[];

  constructor(
    private patientService: PatientService,
    private profileListingService: ProfileListingService,
  ) {}

  ngOnInit(): void {
    this.patientService.getPatientList().subscribe((list) => {
      this.patientList$ = this.profileListingService.listJoinedByLetter(list);
    });
  }
}
