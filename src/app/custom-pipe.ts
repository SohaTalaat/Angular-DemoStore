import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    return `${currencySymbol}${value.toFixed(2)}`;
  }
}

@Pipe({
  name: 'slice30',
  standalone: true,
})
export class SliceDescriptionPipe implements PipeTransform {
  transform(value: string, limit: number = 30): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, properties: string[]): any[] {
    if (!items || !searchText || !properties || properties.length === 0) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return properties.some((property) => {
        const value = this.getNestedProperty(item, property);
        return value && value.toString().toLowerCase().includes(searchText);
      });
    });
  }

  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  }
}
