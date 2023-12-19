import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';
import { environment } from 'environments/environment.development';
import { Observable, from, groupBy, map, mergeMap, toArray } from 'rxjs';
import { MedicoList } from '../interfaces/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos`, data);
  }

  private getMedicosList(): Observable<MedicoList> {
    return this.http.get<MedicoList>(`${this.apiUrl}/medicos`);
  }

  listJoinedByLetter(): Observable<{ letra: string; medicos: Medico[] }[]> {
    return this.getMedicosList().pipe(
      map((medicolist) => medicolist.content),
      mergeMap((medicos) =>
        from(medicos).pipe(
          groupBy((medico) => medico.nome.charAt(0).toUpperCase()),
          mergeMap((group) => group.pipe(toArray())),
          toArray(),
        ),
      ),
      map((gruposPorLetra) => {
        return gruposPorLetra.map((grupo) => ({
          letra: grupo[0].nome.charAt(0).toUpperCase(),
          medicos: grupo,
        }));
      }),
    );
  }
}
