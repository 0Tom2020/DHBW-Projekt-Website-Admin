import { Pipe, PipeTransform } from '@angular/core';
import {timer} from "rxjs";

@Pipe({
  name: 'dokumentFilter'
})
export class DokumentFilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchTerm);
    });
  }

}
/**/
