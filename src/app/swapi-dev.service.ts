import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiDevService {
  private apiUrl = 'https://swapi.dev/api/films/?format=json';

  constructor(private http: HttpClient) {
  }

  public getFilmsWithDetails(): Observable<any[]> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => response.results),
      mergeMap((films: any[]) => {
        const filmObservables = films.map(film => {
          return this.fetchFilmDetailsFromOMDB(film.title, film.release_date).pipe(
            map((omdbData: any) => ({
              ...film,
              omdbData: omdbData
            }))
          );
        });
        return forkJoin(filmObservables);
      }),
      catchError((error: any) => {
        console.error('Error from SWAPI API:', error);
        throw error;
      })
    );
  }

  private fetchFilmDetailsFromOMDB(title: string, releaseDate: string): Observable<any> {
    const year = new Date(releaseDate).getFullYear();
    const omdbApiUrl = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=b9a5e69d`;

    return this.http.get(omdbApiUrl).pipe(
      catchError((error: any) => {
        console.error('Error from OMDB API:', error);
        throw error;
      })
    );
  }
}
