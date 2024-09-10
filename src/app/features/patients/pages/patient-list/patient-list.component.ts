import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileCard } from 'app/shared/models/profile-card';
import {
  debounceTime,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { PatientService } from '../../services/patient.service';
import { ProfileListingService } from './../../../../shared/services/profile-listing.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit, OnDestroy {
  patientList$!: Observable<{ letter: string; profiles: ProfileCard[] }[]>;
  filter!: string;
  private searchTerm$ = new Subject<string>();
  private searchTermSubscription!: Subscription;

  constructor(
    private patientService: PatientService,
    private profileListingService: ProfileListingService,
  ) {
    this.searchTermSubscription = this.searchTerm$
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filter = value;
      });
  }

  ngOnInit(): void {
    this.patientList$ = this.profileListingService.getUpdatedList().pipe(
      switchMap((cachedList) =>
        cachedList.length > 0
          ? of(cachedList)
          : this.patientService
              .getPatientList()
              .pipe(
                tap((list) => this.profileListingService.setUpdatedList(list)),
              ),
      ),
      map((list) => this.profileListingService.listJoinedByLetter(list)),
    );
  }

  updateFilter(filterValue: string): void {
    this.searchTerm$.next(filterValue);
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
