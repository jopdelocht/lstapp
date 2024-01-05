import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'gramsToKilos'
})
export class GramsToKilosPipe implements PipeTransform {
  transform(value: number): number {
    return value > 1000 ? value / 1000 : value;
  }
}