import { Especialidade } from '../enums/especialidade';
import { Endereco } from './endereco';

export interface Medico {
  id?: number;
  nome: string;
  crm: string;
  email: string;
  telefone: string;
  especialidade: Especialidade;
  endereco: Endereco;
}

export interface MedicoEditar {
  id?: number;
  nome: string;
  telefone: string;
  endereco: Endereco;
}

export interface MedicoList {
  content: Medico[];
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
