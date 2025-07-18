import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'timeFormat',
    standalone: true
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: string | number): string {
        const raw = value.toString().replace(/\D/g, '').slice(0, 4);

        if (raw.length < 3) return raw;

        const padded = raw.padStart(4, '0');
        const hours = padded.slice(0, 2);
        const minutes = padded.slice(2, 4);

        return `${hours}:${minutes}`;
    }
}