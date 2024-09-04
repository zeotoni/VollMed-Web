import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileCard } from 'app/shared/models/profile-card';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent {
  @Input() profile!: ProfileCard;
  @ViewChild('modalDeactivation') modal!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  edit() {
    this.router.navigate([`edit`, this.profile.id], {
      relativeTo: this.route,
    });
  }

  deactivate(): void {
    this.modal.nativeElement.firstChild.showModal();
  }
}
