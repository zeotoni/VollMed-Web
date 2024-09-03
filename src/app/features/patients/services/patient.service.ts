import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map, Observable } from 'rxjs';
import {
  PaginatedPatientResponse,
  Patient,
  PatientEdit,
  PatientList,
} from '../models/patient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerPatient(data: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, data);
  }

  getPatientList(): Observable<PatientList[]> {
    return this.http
      .get<PaginatedPatientResponse>(`${this.apiUrl}/patients`)
      .pipe(map((list) => list.content));
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patients/${id}`);
  }

  updatePatient(data: PatientEdit): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/patients`, data);
  }

  deletePatient(id: number): Observable<PatientList> {
    return this.http.delete<PatientList>(`${this.apiUrl}/patients/${id}`);
  }
}
