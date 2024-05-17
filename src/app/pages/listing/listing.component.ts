import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from 'app/core/services/medicos.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { MedicoListService } from './../../core/services/medicos-list.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, AfterViewInit {
  medicosList$!: { letra: string; medicos: Medico[] }[];
  subscriptionMedicosList!: Subscription;
  filter!: string;
  private searchTerm$ = new Subject<string>();

  constructor(
    private medicoService: MedicosService,
    private medicoListService: MedicoListService,
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe((value) => {
      this.filter = value;
    });
  }

  ngOnInit(): void {
    this.medicoService.getMedicosList().subscribe((list) => {
      this.medicosList$ = this.medicoListService.listJoinedByLetter(list);
    });
  }

  ngAfterViewInit(): void {
    this.subscriptionMedicosList = this.medicoListService
      .getUpdatedList()
      .subscribe({
        next: (list) => {
          this.medicosList$ = this.medicoListService.listJoinedByLetter(list);
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
