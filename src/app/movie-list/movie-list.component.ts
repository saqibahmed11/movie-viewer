import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ratings } from "../Ratings";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent {
  private _films: any[] = [];
  private _searchText: string = '';
  private _sortOption: string = '';
  sortedFilms: any[] = [];

  @Input() set films(value: any[]) {
    this._films = value;
    this.sortedFilms = value;
    this.applySearchFilter();
  }

  @Input() set searchText(value: string) {
    this._searchText = value;
    this.applySearchFilter();
  }

  @Input() set sortOption(value: string) {
    this._sortOption = value;
    this.applySearchFilter();
  }

  @Output() selectedFilm = new EventEmitter<{
    title: string,
    opening_crawl: string,
    director: string,
    poster: string,
    ratings: Ratings[]
  }>();

  public selectFilm(film: any) {
    this.selectedFilm.emit({
      title: 'Episode ' + this.romanize(film.episode_id) + ' - ' + film.title,
      opening_crawl: film.opening_crawl,
      director: film.director,
      poster: film.omdbData.Poster,
      ratings: film.omdbData.Ratings
    });
  }

  public applySearchFilter() {
    if (!this._searchText) {
      this.sortedFilms = this._films;
    } else {
      this.sortedFilms = this._films.filter(film =>
        film.title.toLowerCase().includes(this._searchText.toLowerCase())
      );
    }

    this.sortFilms(this._sortOption);
  }

  public sortFilms(option: string) {
    switch (option) {
      case 'episode':
        this.sortedFilms.sort((a, b) => a.episode_id - b.episode_id);
        break;
      case 'title':
        this.sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        this.sortedFilms.sort((a, b) => a.release_date.localeCompare(b.release_date));
        break;
      default:
        break;
    }
  }

  public romanize(num: number): string {
    if (isNaN(num)) return '';
    const digits = String(num).split('');
    const key = [
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
    ];
    let roman = '';
    let i = digits.length;
    while (i--) {
      const digit = +digits[digits.length - 1 - i];
      roman = (key[digit + (i * 10)] || '') + roman;
    }
    return roman;
  }
}
