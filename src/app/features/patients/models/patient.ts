import { Address } from 'app/shared/models/address';
import { Contact } from 'app/shared/models/contact';

export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  contact: Contact;
  address: Address;
  profileType?: string;
}

export interface PatientList {
  id: number;
  name: string;
  cpf: string;
  contact: Contact;
  address: Address;
  profileType: string;
}

export interface PatientEdit {
  id: number;
  name: string;
  contact: {
    phone: string;
  };
  address: Address;
}

export interface PaginatedPatientResponse {
  content: PatientList[];
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
