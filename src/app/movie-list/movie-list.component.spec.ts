import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { OmdbService } from '../services/omdb.service';
import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let omdbService: OmdbService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [MovieListComponent],
      providers: [
        OmdbService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    omdbService = TestBed.get(OmdbService);
    spyOn(omdbService, 'searchMoviesByTitle').and.returnValue(of([{
      Title: 'titleTest',
      Poster: 'posterTest',
      Type: 'typeTest',
      Year: '200Test',
      imdbID: 'idTest'
    }]));

    router = TestBed.get(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movies onSearch', () => {
    component.onSearch('Taxi');

    expect(omdbService.searchMoviesByTitle).toHaveBeenCalledWith('Taxi');
    expect(component.movies).toEqual([{
      Title: 'titleTest',
      Poster: 'posterTest',
      Type: 'typeTest',
      Year: '200Test',
      imdbID: 'idTest'
    }]);
  });

  it('should redirect to movie-details on goToMovieDetails', () => {
    component.goToMovieDetails('idTest');

    expect(router.navigate).toHaveBeenCalledWith(['/movie', 'idTest']);
  });
});
