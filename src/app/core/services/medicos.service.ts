import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import { Medico } from '../interfaces/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos`, data);
  }
}
