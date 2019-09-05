import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { OmdbService } from '../services/omdb.service';
import { InjectionToken, inject } from '@angular/core';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let omdbService: OmdbService;
  let locationMock: any;
  let locationSpy: any;
  const movieMock = {
    Title: 'titleTest',
    Poster: 'posterTest',
    Type: 'typeTest',
    Year: '200Test',
    imdbID: 'idTest',
    Actors: 'test',
    Awards: 'test',
    Country: 'test',
    DVD: 'test',
    Director: 'test',
    Genre: 'test',
    Language: 'test',
    Production: 'test',
    Released: 'test',
    Runtime: 'test',
    Website: 'test',
    Writer: 'test',
    imdbRating: 'test',
    imdbVotes: 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [MovieDetailsComponent],
      providers: [
        OmdbService,
        { provide: Location, useValue: locationMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    omdbService = TestBed.get(OmdbService);
    spyOn(omdbService, 'getMovieDetailByImdbID').and.returnValue(of(movieMock));
    locationMock = {
      back: jasmine.createSpy('back')
    };

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    locationSpy = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set movie on OnInit', () => {
    component.ngOnInit();

    expect(omdbService.getMovieDetailByImdbID).toHaveBeenCalled();
    expect(component.movie).toEqual(movieMock);
  });

  // TODO: Fix back implementation
  xit('should test goBack', () => {
    component.goBack();

    expect(locationSpy.back).toHaveBeenCalled();
  });
});
