import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { FilterService } from '../../services/filter.service';
import { AdquisicionesService } from '../../services/adquisiciones.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  loading = true;
  displayedColumns = ['id', 'name', 'date', 'status', 'actions'];

  constructor(
    private AdquisicionesService: AdquisicionesService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.AdquisicionesService.obtenerAdquisiciones(),
      this.filterService.currentFilters
    ]).subscribe(([items, filters]) => {
      this.items = items;
      this.applyFilters(filters);
      this.loading = false;
    });
  }

  applyFilters(filters: any): void {
    this.filteredItems = this.items.filter(item => {
      let match = true;
      if (filters.searchText) {
        match = match && item.name.toLowerCase().includes(filters.searchText.toLowerCase());
      }
      if (filters.status) {
        match = match && item.status === filters.status;
      }
      return match;
    });
  }
}
