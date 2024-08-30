import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ContactFormService } from 'app/shared/services/contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';

  parentContainer = inject(ControlContainer);

  constructor(private contactFormService: ContactFormService) {}

  ngOnInit(): void {
    const contactForm = this.contactFormService.createContactForm();
    this.parentFormGroup.setControl(this.controlKey, contactForm);
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
}
