import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() style: 'primary' | 'secondary' | 'disabled' = 'primary';

  @Input() disabled = true;
}
