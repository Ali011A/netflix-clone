import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { IVideoContent } from 'src/app/interface/video-content';
import { AuthService } from 'src/app/services/auth.service';
import { MoiveService } from 'src/app/services/moive.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent {
  constructor(private _Router:Router,private _AuthService:AuthService,private _MoviesService:MoiveService){};
  name=JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  email=JSON.parse(sessionStorage.getItem("LoggedInUser")!).email;
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();
popularMovies:IVideoContent[]=[];
movies:IVideoContent[]=[];
ratedMovies:IVideoContent[]=[];
nowPlayingMovies:IVideoContent[]=[];
upcomingMovies:IVideoContent[]=[];
topRatedMovies:IVideoContent[]=[];
tvShows:IVideoContent[]=[];
sources=[
  this._MoviesService.getTvShows(),
  this._MoviesService.getMovies(),
  this._MoviesService.getRatedMovies(),
  this._MoviesService.getNowPlayingMovies(),
  this._MoviesService.getUpcomingMovies(),
  this._MoviesService.getPopularMovies(),
  this._MoviesService.getTopRated()
];
  ngOnInit(): void {

    forkJoin(this.sources).pipe(
      map(([tvShows, movies, ratedMovies, nowPlayingMovies, upcomingMovies, popularMovies, topRatedMovies]) => {
        
       return {
        tvShows,
        movies,
        ratedMovies,
        nowPlayingMovies,
        upcomingMovies,
        popularMovies,
        topRatedMovies
       } 
      })
    ).subscribe((res:any)=>{
      this.tvShows=res.tvShows.results as  IVideoContent[];
      this.movies=res.movies.results as IVideoContent[];
      this.ratedMovies=res.ratedMovies.results as IVideoContent[];
      this.nowPlayingMovies=res.nowPlayingMovies.results as IVideoContent[];
      this.upcomingMovies=res.upcomingMovies.results as IVideoContent[] ;
      this.popularMovies=res.popularMovies.results as IVideoContent[];
      this.topRatedMovies=res.topRatedMovies.results as IVideoContent[];
    })
    this._MoviesService.getMovies().subscribe({
      next: (movies:any) => {
       console.log(movies);

     this.bannerDetail$=this._MoviesService.getBannerDetail(movies.results[4].id);
     this.bannerVideo$=this._MoviesService.getBannerVideo(movies.results[4].id);
       this.movies=movies.results
       
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    this._MoviesService.getTvShows().subscribe({
      next: (movies:any) => {
        this.tvShows=movies.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

  

    this._MoviesService.getNowPlayingMovies().subscribe({
      next: (movies:any) => {
        this.nowPlayingMovies=movies.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    this._MoviesService.getPopularMovies().subscribe({
      next: (res:any) => {
        this.popularMovies=res.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    this._MoviesService.getTopRated().subscribe({
      next: (res:any) => {
        this.topRatedMovies=res.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    this._MoviesService.getUpcomingMovies().subscribe({
      next: (res:any) => {
        
        this.upcomingMovies=res.results
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    


  }
  signOut(){
    sessionStorage.removeItem("LoggedInUser")
    this._AuthService.SignOut();
   //this._Router.navigate(['/login']);
       
  }
}
