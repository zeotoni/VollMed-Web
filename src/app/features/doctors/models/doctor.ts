import { Address } from 'app/shared/models/address';
import { Contact } from 'app/shared/models/contact';
import { Specialty } from './specialty';

export interface Doctor {
  id?: number;
  name: string;
  crm: string;
  specialty: Specialty;
  contact: Contact;
  address: Address;
  profileType?: string;
}

export interface DoctorEdit {
  id?: number;
  name: string;
  phone: string;
  address: Address;
}

export interface DoctorList {
  content: Doctor[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
