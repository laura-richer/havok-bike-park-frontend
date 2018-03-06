import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {

  transform(content) {
    return content.substring(6, 9) + '/' + content.substring(4, 6) + '/' + content.substring(0, 4);
  }
}