import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'app/core/interfaces/medico';

@Component({
  selector: 'app-card-medico',
  templateUrl: './card-medico.component.html',
  styleUrls: ['./card-medico.component.scss'],
})
export class CardMedicoComponent {
  @Input() medico!: Medico;

  constructor(private router: Router) {}

  edit(): void {
    this.router.navigate([`/editar/` + this.medico.id]);
  }
}
