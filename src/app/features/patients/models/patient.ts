import { Address } from 'app/shared/models/address';
import { Contact } from 'app/shared/models/contact';

export interface Patient {
  id?: number;
  name: string;
  cpf: string;
  contact: Contact;
  address: Address;
}
