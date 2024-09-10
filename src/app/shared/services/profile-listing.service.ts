import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileCard } from '../models/profile-card';

@Injectable({
  providedIn: 'root',
})
export class ProfileListingService {
  private listProfileSubject = new BehaviorSubject<ProfileCard[]>([]);

  setUpdatedList(list: ProfileCard[]) {
    this.listProfileSubject.next(list);
  }

  getUpdatedList(): Observable<ProfileCard[]> {
    return this.listProfileSubject.asObservable();
  }

  listJoinedByLetter(list: ProfileCard[]) {
    const groupedProfiles: { letter: string; profiles: ProfileCard[] }[] = [];
    const groupedMap = new Map<string, ProfileCard[]>();

    for (const profile of list) {
      const letter = profile.name.charAt(0).toUpperCase();
      if (!groupedMap.has(letter)) {
        groupedMap.set(letter, []);
      }
      groupedMap.get(letter)?.push(profile);
    }

    groupedMap.forEach((value, key) => {
      groupedProfiles.push({ letter: key, profiles: value });
    });

    return groupedProfiles;
  }
}
