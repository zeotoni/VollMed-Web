import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Doctor,
  DoctorEdit,
  DoctorList,
  PaginatedDoctorResponse,
} from 'app/features/doctors/models/doctor';

import { environment } from 'environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerDoctor(data: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/doctors`, data);
  }

  getDoctorList(): Observable<DoctorList[]> {
    return this.http
      .get<PaginatedDoctorResponse>(`${this.apiUrl}/doctors`)
      .pipe(map((list) => list.content));
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}`);
  }

  updateDoctor(data: DoctorEdit): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctors`, data);
  }

  deleteDoctor(id: number | undefined): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/doctors/${id}`);
  }
}
