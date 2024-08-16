import { AfterViewInit, Component, OnInit } from '@angular/core';

import { DoctorListService } from 'app/features/doctors/services/doctor-list.service';

import { Subject, Subscription, debounceTime } from 'rxjs';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  doctorList$!: { letter: string; doctors: Doctor[] }[];
  subscriptionDoctorList!: Subscription;
  filter!: string;
  page = 0;
  private searchTerm$ = new Subject<string>();

  constructor(
    private doctorService: DoctorService,
    private doctorListService: DoctorListService,
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe((value) => {
      this.filter = value;
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctorList(this.page).subscribe((list) => {
      this.doctorList$ = this.doctorListService.listJoinedByLetter(list);
    });
  }

  ngAfterViewInit(): void {
    this.subscriptionDoctorList = this.doctorListService
      .getUpdatedList()
      .subscribe({
        next: (list) => {
          this.doctorList$ = this.doctorListService.listJoinedByLetter(list);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateFilter(filterValue: string): void {
    this.searchTerm$.next(filterValue);
  }
}
