import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico, MedicoEditar } from 'app/core/interfaces/medico';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos`, data);
  }

  getMedicosList(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/medicos`);
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/medicos/${id}`);
  }

  editMedico(data: MedicoEditar): Observable<MedicoEditar> {
    return this.http.put<MedicoEditar>(`${this.apiUrl}/medicos`, data);
  }

  deleteMedico(id: number | undefined): Observable<Medico> {
    return this.http.delete<Medico>(`${this.apiUrl}/medicos/${id}`);
  }

  getByName(name: string): Observable<Medico[]> {
    return this.http.get<Medico[]>(
      `${this.apiUrl}/medicos/search?nome=${name}`,
    );
  }
}
