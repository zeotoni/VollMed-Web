import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from 'app/core/services/medicos.service';
import { Observable, Subscription } from 'rxjs';
import { MedicoListService } from './../../core/services/medicos-list.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, AfterViewInit {
  medicosList$!: Observable<{ letra: string; medicos: Medico[] }[]>;
  subscriptionMedicosList!: Subscription;

  constructor(
    private medicoService: MedicosService,
    private medicoListService: MedicoListService,
  ) {}

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
}
