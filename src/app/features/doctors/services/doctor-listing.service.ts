import { Injectable } from '@angular/core';
import { ProfileCard } from 'app/shared/models/profile-card';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorListingService {
  private listDoctorSubject = new BehaviorSubject<ProfileCard[]>([]);

  setUpdatedList(list: ProfileCard[]) {
    this.listDoctorSubject.next(list);
  }

  getUpdatedList(): Observable<ProfileCard[]> {
    return this.listDoctorSubject.asObservable();
  }
}
