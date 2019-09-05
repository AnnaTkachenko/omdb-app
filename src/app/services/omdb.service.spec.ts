import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OmdbService, ISearchRes } from './omdb.service';
import { IMovie } from '../movie-list/movie-list.component';

describe('OmdbService', () => {
  const mockResMovies: ISearchRes = {
    Search: [{
      Poster: 'https://m.media-amazon.com/images/M/MV5BN2MwNjJlODAtMTc1MS00NjkwLTg2NDMtYzFjZmU2MGM1YWUwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SX300.jpg',
      Title: 'Guardians of the Galaxy Vol. 2',
      Type: 'movie',
      Year: '2017',
      imdbID: 'tt3896198'
    },
    {
      Poster: 'N/A',
      Title: 'Bonus Round: The Making of \'Guardians of the Galaxy Vol. 2\'',
      Type: 'movie',
      Year: '2017',
      imdbID: 'tt7312152'
    },
    {
      Poster: 'N/A',
      Title: 'Chris Pratt Shows You Around the Set of Guardians of the Galaxy Vol. 2',
      Type: 'movie',
      Year: '2016',
      imdbID: 'tt5630492',
    }],
    Response: true,
    totalResults: 3
  };

  const mockResMovieByID: IMovie = {
    Actors: 'Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel',
    Awards: 'Nominated for 1 Oscar. Another 12 wins & 42 nominations.',
    BoxOffice: '$389,804,217',
    Country: 'USA',
    DVD: '22 Aug 2017',
    Director: 'James Gunn',
    Genre: 'Action, Adventure, Comedy, Sci-Fi',
    Language: 'English',
    Metascore: '67',
    Plot: 'The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord\'s encounter with his father the ambitious celestial being Ego.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BN2MwNjJlODAtMTc1MS00NjkwLTg2NDMtYzFjZmU2MGM1YWUwXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_SX300.jpg',
    Production: 'Walt Disney Pictures',
    Rated: 'PG-13',
    Ratings: [{
      Source: 'Internet Movie Database',
      Value: '7.6/10'
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '84%'
    },
    {
      Source: 'Metacritic',
      Value: '67/100'
    }],
    Released: '05 May 2017',
    Response: 'True',
    Runtime: '136 min',
    Title: 'Guardians of the Galaxy Vol. 2',
    Type: 'movie',
    Website: 'https://marvel.com/guardians',
    Writer: 'James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)',
    Year: '2017',
    imdbID: 'tt3896198',
    imdbRating: '7.6',
    imdbVotes: '496,865'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OmdbService]
    });
  });

  it('should be created', () => {
    const service: OmdbService = TestBed.get(OmdbService);
    expect(service).toBeTruthy();
  });

  it('should get movies by title', inject([HttpTestingController, OmdbService],
    (
      httpMock: HttpTestingController,
      service: OmdbService
    ) => {

      service.searchMoviesByTitle('Guardians of the Galaxy 2').subscribe(res => {
        expect(res).toEqual(mockResMovies.Search);
      });

      const rq = httpMock.expectOne('http://www.omdbapi.com/?s=Guardians of the Galaxy 2&apikey=64715805');
      rq.flush(mockResMovies);

      expect(rq.request.method).toEqual('GET');

      httpMock.verify();
    }));

  it('should get movies by id', inject([HttpTestingController, OmdbService],
    (
      httpMock: HttpTestingController,
      service: OmdbService
    ) => {

      service.getMovieDetailByImdbID('tt3896198').subscribe(res => {
        expect(res).toEqual(mockResMovieByID);
      });

      const rq = httpMock.expectOne('http://www.omdbapi.com/?i=tt3896198&apikey=64715805');
      rq.flush(mockResMovieByID);

      expect(rq.request.method).toEqual('GET');

      httpMock.verify();
    }));
});

