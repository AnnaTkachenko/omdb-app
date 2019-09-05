import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { IMovie } from './movie-list/movie-list.component';

interface ISearchRes {
  Response: boolean;
  Search: IMovie[];
  totalResults: number;
}

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  // lastSearch: BehaviorSubject<string>;
  private apiKey = '64715805';

  constructor(private readonly http: HttpClient) { }

  searchMovieByTitle(title: string) {
    const url = 'http://www.omdbapi.com/?s=' + title + '&apikey=' + this.apiKey;

    return this.http.get<ISearchRes>(url).pipe(map((res) => {
      return res.Search;
    }));
  }

  getMovieDetailByImdbID(id: string) {
    const url = 'http://www.omdbapi.com/?i=' + id + '&apikey=' + this.apiKey;

    return this.http.get<IMovie>(url).pipe(map((res) => {
      return res;
    }));
  }
}
