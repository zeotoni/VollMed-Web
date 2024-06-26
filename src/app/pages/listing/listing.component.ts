import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Doctor } from 'app/core/interfaces/doctor';
import { DoctorService } from 'app/core/services/medicos.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { DoctorListService } from '../../core/services/doctor-list.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, AfterViewInit {
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
