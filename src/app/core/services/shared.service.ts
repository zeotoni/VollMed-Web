import { Injectable } from '@angular/core';
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  listJoinedByLetter(list: Doctor[]) {
    let groupedDoctors!: { letter: string; doctors: Doctor[] }[];
    const groupedMap = new Map<string, Doctor[]>();

    // Agrupar médicos por letter
    for (const doctor of list) {
      const letter = doctor.name.charAt(0).toUpperCase();
      if (!groupedMap.has(letter)) {
        groupedMap.set(letter, []);
      }
      groupedMap.get(letter)?.push(doctor);
    }

    // Converter o mapa em um array de objetos
    groupedMap.forEach((value, key) => {
      groupedDoctors.push({ letter: key, doctors: value });
    });

    return groupedDoctors;
  }
}
