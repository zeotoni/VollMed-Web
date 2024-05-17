import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
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

  getFilteredMedicosList(
    filterValue: string,
  ): Observable<{ letra: string; medicos: Medico[] }[]> {
    return this.listMedicosSubject.pipe(
      map((list) => {
        const filteredList = list.filter((medico) =>
          medico.nome.toLowerCase().includes(filterValue.toLowerCase()),
        );

        return this.listJoinedByLetter(filteredList);
      }),
    );
  }

  listJoinedByLetter(list: Medico[]) {
    const groupedMedicos: { letra: string; medicos: Medico[] }[] = [];
    const groupedMap = new Map<string, Medico[]>();

    for (const medico of list) {
      const letra = medico.nome.charAt(0).toUpperCase();
      if (!groupedMap.has(letra)) {
        groupedMap.set(letra, []);
      }
      groupedMap.get(letra)?.push(medico);
    }

    groupedMap.forEach((value, key) => {
      groupedMedicos.push({ letra: key, medicos: value });
    });

    return groupedMedicos;
  }
}
