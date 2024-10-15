import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const options = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTI5NDgyOTA3ZmRjZDJlMTgxZDUxY2YwYmRjZjdkMCIsIm5iZiI6MTcyNjg1NDk0OC42NTIzMzEsInN1YiI6IjY2YWNhZDkzYzcyODNiOTgwM2NkNzQ3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wh8CJ7PYvWP3N1BMxr855NJ8z39nqeZpxfxcfw82XGw'
  }
}

@Injectable({
  providedIn: 'root'
})
export class MoiveService {

  constructor(private _HttpClient:HttpClient) { }

  getactorName(){

    return this._HttpClient.get('https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1', options)
  } 
  
  getCastName(movieId: number){
  
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`, options);
  }
  getMovies() {
    return this._HttpClient.get<any>('https://api.themoviedb.org/3/discover/movie', options)
  }

  getTvShows() {
    return this._HttpClient.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies() {
    return this._HttpClient.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options)
  }

  getBannerImage(id: number) {
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this._HttpClient.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this._HttpClient.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this._HttpClient.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this._HttpClient.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
  getPopularTvShows() {
    return this._HttpClient.get('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options);
  }
}
