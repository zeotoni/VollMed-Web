import { Pipe, PipeTransform } from '@angular/core';
import { Medico } from 'app/core/interfaces/medico';

@Pipe({ name: 'filterByName' })
export class FilterByName implements PipeTransform {
  transform(
    medicosList: { letra: string; medicos: Medico[] }[],
    nameQuery: string,
  ) {
    nameQuery = nameQuery?.toLowerCase();

    if (nameQuery) {
      return medicosList.map((item) => {
        const filteredMedicos = item.medicos.filter((medico) =>
          medico.nome.toLowerCase().includes(nameQuery),
        );

        return { letra: item.letra, medicos: filteredMedicos };
      });
    }

    return medicosList;
  }
}
