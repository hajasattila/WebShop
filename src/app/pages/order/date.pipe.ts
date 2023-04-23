import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string, format: string = 'yyyy.MM.dd.'): string {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return format.replace('yyyy', year.toString()).replace('MM', month.toString().padStart(2, '0')).replace('dd', day.toString().padStart(2, '0'));
    }
}