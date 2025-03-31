import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService
  ) {
    this.filterForm = this.fb.group({
      searchText: [''],
      status: [''],
      dateFrom: [''],
      dateTo: ['']
    });
  }

  applyFilters(): void {
    this.filterService.updateFilters(this.filterForm.value);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filterService.clearFilters();
  }
}