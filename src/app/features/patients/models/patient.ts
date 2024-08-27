import { Address } from 'app/shared/models/address';
import { Contact } from 'app/shared/models/contact';

export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  contact: Contact;
  address: Address;
}

export interface PatientList {
  content: Patient[];
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
