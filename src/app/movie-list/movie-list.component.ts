import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OmdbService } from '../services/omdb.service';

export interface IMovie {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
  Actors?: string;
  Awards?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Plot?: string;
  Language?: string;
  Production?: string;
  Released?: string;
  Rated?: string;
  Runtime?: string;
  Website?: string;
  Writer?: string;
  Response?: string;
  imdbRating?: string;
  imdbVotes?: string;
  BoxOffice?: string;
  Ratings?: Array<any>;
  Metascore?: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  movies: IMovie[];

  constructor(
    private readonly omdbService: OmdbService,
    private readonly router: Router
  ) { }

  // TODO: Implement last search result saving
  onSearch(title: string) {
    this.omdbService.searchMoviesByTitle(title).subscribe((res) => {
      return this.movies = res;
    });
  }

  goToMovieDetails(movieId: string) {
    this.router.navigate(['/movie', movieId]);
  }
}
