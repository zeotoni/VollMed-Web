import { Component, OnDestroy, OnInit } from '@angular/core';

import { ProfileCard } from 'app/shared/models/profile-card';
import { ProfileListingService } from 'app/shared/services/profile-listing.service';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { DoctorListingService } from '../../services/doctor-listing.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit, OnDestroy {
  doctorList$!: Observable<{ letter: string; profiles: ProfileCard[] }[]>;
  filter!: string;
  private searchTerm$ = new Subject<string>();
  private searchTermSubscription!: Subscription;

  constructor(
    private doctorService: DoctorService,
    private doctorListingService: DoctorListingService,
    private profileListingService: ProfileListingService,
  ) {
    this.searchTermSubscription = this.searchTerm$
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filter = value;
      });
  }

  ngOnInit(): void {
    this.doctorList$ = this.doctorListingService.getUpdatedList().pipe(
      switchMap((cachedList) =>
        cachedList.length > 0
          ? of(cachedList)
          : this.doctorService
              .getDoctorList()
              .pipe(
                tap((list) => this.doctorListingService.setUpdatedList(list)),
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
