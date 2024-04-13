import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  from,
  groupBy,
  map,
  mergeMap,
  toArray,
} from 'rxjs';
import { Medico } from '../interfaces/medico';

@Injectable({
  providedIn: 'root',
})
export class MedicoListService {
  listMedicosSubject = new Subject<Medico[]>();

  setUpdatedList(list: Medico[]) {
    this.listMedicosSubject.next(list);
  }

  getUpdatedList(): Observable<Medico[]> {
    return this.listMedicosSubject.asObservable();
  }

  listJoinedByLetter(
    list: Medico[],
  ): Observable<{ letra: string; medicos: Medico[] }[]> {
    return from(list).pipe(
      groupBy((medico) => medico.nome.charAt(0).toUpperCase()),
      mergeMap((group) => group.pipe(toArray())),
      toArray(),
      map((gruposPorLetra) => {
        return gruposPorLetra.map((grupo) => ({
          letra: grupo[0].nome.charAt(0).toUpperCase(),
          medicos: grupo,
        }));
      }),
    );
  }
}
