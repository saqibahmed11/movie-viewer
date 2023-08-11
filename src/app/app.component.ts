import { Component, OnInit } from '@angular/core';
import { SwapiDevService } from "./swapi-dev.service";
import { Ratings } from "./Ratings";

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

  selectedFilmDetails:
    {
      title: string,
      opening_crawl: string,
      director: string,
      poster: string,
      ratings: Ratings[]
    } =
    {
      title: '',
      opening_crawl: '',
      director: '',
      poster: '',
      ratings: []
    };

  constructor(private swapiDevService: SwapiDevService) {}

  ngOnInit() {
    this.fetchFilms();
  }

  public fetchFilms() {
    this.isLoading = true;
    this.swapiDevService.getFilmsWithDetails().subscribe(
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
    this.selectedFilmDetails = { title: '', opening_crawl: '', director: '', poster: '', ratings: [] };
  }

  public onSortOptionSelected(option: string) {
    this.currentSortOption = option;
  }

  public onFilmSelected(details: { title:string, opening_crawl: string, director: string, poster: string, ratings: Ratings[] }) {
    this.selectedFilmDetails = details;
  }
}
