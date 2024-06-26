import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from 'app/core/interfaces/doctor';

@Pipe({ name: 'filterByName' })
export class FilterByName implements PipeTransform {
  transform(
    doctorList: { letter: string; doctors: Doctor[] }[],
    nameQuery: string,
  ) {
    nameQuery = nameQuery?.toLowerCase();

    if (nameQuery) {
      return doctorList.map((item) => {
        const filteredDoctors = item.doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(nameQuery),
        );

        return { letter: item.letter, doctors: filteredDoctors };
      });
    }

    return doctorList;
  }
}
