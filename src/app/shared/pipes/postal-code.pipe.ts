import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postalCode',
})
export class PostalCodePipe implements PipeTransform {
  transform(value: string): string {
    const cep = value.toString();
    if (cep.length === 8) {
      return cep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
    }
    return value.toString();
  }
}
