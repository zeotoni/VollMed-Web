import { Injectable } from '@angular/core';
import { PatientService } from 'app/features/patients/services/patient.service';

import { Observable, switchMap, tap } from 'rxjs';
import { ProfileCard } from '../models/profile-card';
import { ProfileListingService } from './profile-listing.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileDeactivationService {
  constructor(
    private patientService: PatientService,
    private profileListingService: ProfileListingService,
  ) {}

  deactivateProfile(
    profileId: number,
    profileType: string,
  ): Observable<ProfileCard[]> {
    switch (profileType) {
      case 'PATIENT':
        return this.patientService.deletePatient(profileId).pipe(
          switchMap(() => this.patientService.getPatientList()),
          tap((patients) =>
            this.profileListingService.setUpdatedList(patients),
          ),
        );

      default:
        throw new Error('Tipo de perfil não suportado');
    }
  }
}
