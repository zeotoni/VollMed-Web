import { Address } from 'app/shared/models/address';
import { Specialty } from './specialty';

export interface Doctor {
  id?: number;
  name: string;
  crm: string;
  email: string;
  phone: string;
  specialty: Specialty;
  address: Address;
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
