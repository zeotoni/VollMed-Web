import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerPatient(data: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, data);
  }
}
