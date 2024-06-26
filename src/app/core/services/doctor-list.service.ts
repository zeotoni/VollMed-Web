import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorListService {
  listDoctorSubject = new Subject<Doctor[]>();

  setUpdatedList(list: Doctor[]) {
    this.listDoctorSubject.next(list);
  }

  getUpdatedList(): Observable<Doctor[]> {
    return this.listDoctorSubject.asObservable();
  }

  getFilteredDoctorList(
    filterValue: string,
  ): Observable<{ letter: string; doctors: Doctor[] }[]> {
    return this.listDoctorSubject.pipe(
      map((list) => {
        const filteredList = list.filter((doctor) =>
          doctor.name.toLowerCase().includes(filterValue.toLowerCase()),
        );

        return this.listJoinedByLetter(filteredList);
      }),
    );
  }

  listJoinedByLetter(list: Doctor[]) {
    const groupedDoctors: { letter: string; doctors: Doctor[] }[] = [];
    const groupedMap = new Map<string, Doctor[]>();

    for (const doctor of list) {
      const letter = doctor.name.charAt(0).toUpperCase();
      if (!groupedMap.has(letter)) {
        groupedMap.set(letter, []);
      }
      groupedMap.get(letter)?.push(doctor);
    }

    groupedMap.forEach((value, key) => {
      groupedDoctors.push({ letter: key, doctors: value });
    });

    return groupedDoctors;
  }
}
