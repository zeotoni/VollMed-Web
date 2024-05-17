import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/medico';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  listJoinedByLetter(list: Medico[]) {
    let groupedMedicos!: { letra: string; medicos: Medico[] }[];
    const groupedMap = new Map<string, Medico[]>();

    // Agrupar médicos por letra
    for (const medico of list) {
      const letra = medico.nome.charAt(0).toUpperCase();
      if (!groupedMap.has(letra)) {
        groupedMap.set(letra, []);
      }
      groupedMap.get(letra)?.push(medico);
    }

    // Converter o mapa em um array de objetos
    groupedMap.forEach((value, key) => {
      groupedMedicos.push({ letra: key, medicos: value });
    });

    return groupedMedicos;
  }
}
