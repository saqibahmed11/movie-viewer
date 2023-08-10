import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiDevService {
  private apiUrl = 'https://swapi.dev/api/films/?format=json';

  constructor(private http: HttpClient) {
  }

  public getFilms(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => response.results),
      catchError((error: any) => {
        console.error('Error from SWAPI DEV:', error);
        throw error;
      })
    );
  }
}
