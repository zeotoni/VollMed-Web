import { Component, OnInit } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from 'app/core/services/medicos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  medicosList$!: Observable<{ letra: string; medicos: Medico[] }[]>;

  constructor(private medicoService: MedicosService) {}

  ngOnInit(): void {
    this.medicosList$ = this.medicoService.listJoinedByLetter();
  }
}
