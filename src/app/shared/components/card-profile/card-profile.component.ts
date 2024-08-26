import { Component, Input } from '@angular/core';
import { ProfileCard } from 'app/shared/models/profile-card';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent {
  @Input() profile!: ProfileCard;

  edit() {
    throw new Error('Method not implemented.');
  }

  deactivate() {
    throw new Error('Method not implemented.');
  }
}
