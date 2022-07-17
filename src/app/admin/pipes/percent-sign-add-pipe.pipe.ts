import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentSignAddPipe'
})
export class PercentSignAddPipePipe implements PipeTransform {
  transform(value: number, args?: any): string {
    return value + '%';
  }
}
