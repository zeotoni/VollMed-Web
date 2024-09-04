import { Pipe, PipeTransform } from '@angular/core';
import { ProfileCard } from '../models/profile-card';

@Pipe({ name: 'filterByName' })
export class FilterByName implements PipeTransform {
  transform(
    profileList: { letter: string; profiles: ProfileCard[] }[],
    nameQuery: string,
  ) {
    nameQuery = nameQuery?.toLowerCase();

    if (nameQuery) {
      return profileList.map((item) => {
        const filteredProfiles = item.profiles.filter((profile) =>
          profile.name.toLowerCase().includes(nameQuery),
        );

        return { letter: item.letter, profiles: filteredProfiles };
      });
    }

    return profileList;
  }
}
