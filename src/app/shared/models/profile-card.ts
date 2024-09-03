import { Specialty } from 'app/features/doctors/models/specialty';
import { Address } from './address';
import { Contact } from './contact';

export interface ProfileCard {
  id: number;
  name: string;
  contact: Contact;
  address: Address;
  specialty?: Specialty;
  crm?: string;
  cpf?: string;
  profileType: string;
}
