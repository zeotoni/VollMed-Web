import { State } from '../enums/state';

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  number: string;
  complement: string;
  state: State;
}
