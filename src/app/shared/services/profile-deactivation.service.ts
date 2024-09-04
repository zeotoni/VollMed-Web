import { Injectable } from '@angular/core';
import { PatientService } from 'app/features/patients/services/patient.service';
import { Observable } from 'rxjs';
import { ProfileCard } from '../models/profile-card';

@Injectable({
  providedIn: 'root',
})
export class ProfileDeactivationService {
  constructor(private patientService: PatientService) {}

  deactivateProfile(
    profileId: number,
    profileType: string,
  ): Observable<ProfileCard> {
    switch (profileType) {
      case 'PATIENT':
        return this.patientService.deletePatient(profileId);
      default:
        throw new Error('Tipo de perfil não suportado');
    }
  }
}
