import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';
import { Patient, PatientList } from '../models/patient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerPatient(data: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, data);
  }

  getPatientList(): Observable<Patient[]> {
    return this.http
      .get<PatientList>(`${this.apiUrl}/patients`)
      .pipe(map((list) => list.content));
  }
}
