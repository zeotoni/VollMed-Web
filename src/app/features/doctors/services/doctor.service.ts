import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Doctor,
  DoctorEdit,
  DoctorList,
} from 'app/features/doctors/models/doctor';

import { environment } from 'environments/environment.development';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/doctors`, data);
  }

  getDoctorList(page: number): Observable<Doctor[]> {
    return this.http
      .get<DoctorList>(`${this.apiUrl}/doctors${`?page=`}${page}`)
      .pipe(map((list) => list.content));
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}`);
  }

  editDoctor(data: DoctorEdit): Observable<DoctorEdit> {
    return this.http.put<DoctorEdit>(`${this.apiUrl}/doctors`, data);
  }

  deleteDoctor(id: number | undefined): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/doctors/${id}`);
  }

  getByName(name: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      `${this.apiUrl}/doctors/search?name=${name}`,
    );
  }
}
