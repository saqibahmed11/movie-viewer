import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-sort',
  templateUrl: './search-sort.component.html',
  styleUrls: ['./search-sort.component.css']
})

export class SearchSortComponent {
  @Output() sortOptionSelected = new EventEmitter<string>();

  @Output() searchTextEntered = new EventEmitter<string>();

  public sortFilms(option: string) {
    this.sortOptionSelected.emit(option);
  }

  public onSearchTextEntered(searchText: string) {
    this.searchTextEntered.emit(searchText);
  }
}
