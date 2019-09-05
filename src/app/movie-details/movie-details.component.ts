import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from '../movie-list/movie-list.component';
import { OmdbService } from '../omdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: IMovie;
  private movieID: string;

  constructor(
    private readonly omdbService: OmdbService,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.movieID = params.id);

    this.omdbService.getMovieDetailByImdbID(this.movieID).subscribe(res => {
      console.log(res);

      return this.movie = res;
    });
  }

  goBack() {
    this.location.back();
  }

}
