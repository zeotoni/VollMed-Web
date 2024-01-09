import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'app/core/interfaces/medico';
import { MedicosService } from 'app/core/services/medicos.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  modalText = 'Cadastro realizado com sucesso!';
  @ViewChild('modal') modalWarning!: ElementRef;
  constructor(
    private medicosService: MedicosService,
    private router: Router,
  ) {}

  onSubmit(data: Medico) {
    this.medicosService.register(data).subscribe({
      next: () => {
        this.openModal();
        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['listar']);
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openModal(): void {
    this.modalWarning.nativeElement.firstChild.showModal();
  }

  closeModal(): void {
    this.modalWarning.nativeElement.firstChild.close();
  }
}
