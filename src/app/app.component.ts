import { Component, OnInit } from '@angular/core';
import { SwapiDevService } from "./swapi-dev.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'movie-viewer';
  films: any[] = [];
  isLoading: boolean = true;
  currentSortOption: string = '';
  searchText: string = '';

  selectedFilmDetails: { title: string, opening_crawl: string, director: string } = { title: '', opening_crawl: '', director: '' };

  constructor(private swapiDevService: SwapiDevService) {}

  ngOnInit() {
    this.fetchFilms();
  }

  public fetchFilms() {
    this.isLoading = true;
    this.swapiDevService.getFilms().subscribe(
      (films: any[]) => {
        this.films = films;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching films:', error);
        this.isLoading = false;
      });
  }

  public onSearchTextEntered(searchText: string) {
    this.searchText = searchText;
  }

  public onSortOptionSelected(option: string) {
    this.currentSortOption = option;
  }

  public onFilmSelected(details: { title:string, opening_crawl: string, director: string }) {
    this.selectedFilmDetails = details;
  }
}
