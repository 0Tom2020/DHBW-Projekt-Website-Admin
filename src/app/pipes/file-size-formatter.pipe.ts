import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSizeFormatter'
})
export class FileSizeFormatterPipe implements PipeTransform {

  UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte']
  BYTES_PER_KB = 1000


  transform(size: string, ...args: unknown[]): unknown {
    return this.humanFileSize(Number(size));
  }

   humanFileSize(sizeBytes: number | bigint): string {
    let size = Math.abs(Number(sizeBytes))

    let u = 0
    while(size >= this.BYTES_PER_KB && u < this.UNITS.length-1) {
      size /= this.BYTES_PER_KB
      ++u
    }

    return new Intl.NumberFormat([], {
      style: 'unit',
      unit: this.UNITS[u],
      unitDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(size)
  }

}
