// Creation of the custom pipe operator
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'gramsToKilos'
})
// This is where the magic happens...
export class GramsToKilosPipe implements PipeTransform {
  transform(value: number): number {
    return value > 1000 ? value / 1000 : value;
  }
}