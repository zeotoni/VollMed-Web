import { Component, OnInit } from '@angular/core';
import { ProfileCard } from 'app/shared/models/profile-card';
import { debounceTime, Subject } from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { ProfileListingService } from './../../../../shared/services/profile-listing.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patientList$!: { letter: string; profiles: ProfileCard[] }[];
  filter!: string;
  private searchTerm$ = new Subject<string>();

  constructor(
    private patientService: PatientService,
    private profileListingService: ProfileListingService,
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe((value) => {
      this.filter = value;
    });
  }

  ngOnInit(): void {
    this.patientService.getPatientList().subscribe((list) => {
      this.patientList$ = this.profileListingService.listJoinedByLetter(list);
    });
  }

  updateFilter(filterValue: string): void {
    this.searchTerm$.next(filterValue);
  }
}
