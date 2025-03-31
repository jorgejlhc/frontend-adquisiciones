import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filters = new BehaviorSubject<any>({});
  currentFilters = this.filters.asObservable();

  updateFilters(filters: any): void {
    this.filters.next(filters);
  }

  clearFilters(): void {
    this.filters.next({});
  }
}
