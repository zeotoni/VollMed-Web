import { Especialidade } from '../enums/especialidade';
import { Endereco } from './endereco';

export interface Medico {
  nome: string;
  crm: string;
  email: string;
  telefone: string;
  especialidade: Especialidade;
  endereco: Endereco;
}
