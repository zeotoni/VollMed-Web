import { Estado } from '../enums/estados';

export interface Endereco {
  logradouro: string;
  cep: string;
  cidade: string;
  numero: string;
  complemento: string;
  uf: Estado;
}
