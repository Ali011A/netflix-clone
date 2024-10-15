import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IVideoContent } from 'src/app/interface/video-content';
import Swiper from 'swiper';
 import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-cursol',
  templateUrl: './movie-cursol.component.html',
  styleUrls: ['./movie-cursol.component.scss']
})
export class MovieCursolComponent implements OnInit, AfterViewInit {
 
 
  
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;
  FavData: number[] = [];
  constructor(private _Router:Router,private _snackBar:MatSnackBar) { }
  ngAfterViewInit():void {
   this.initSwiper();
  }

  ngOnInit(): void {
    // console.log(this.videoContents);
  }



  private initSwiper() {
    return new Swiper(this.swiperContainer.nativeElement, {

      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }



    })

  }

  

  setHovercontent(movie: IVideoContent) {
    this.selectedContent = movie.title || movie.name || '';
  }

  clearHovercontent() {
    this.selectedContent = '';

  }

  goToDetails(id: number) {
    this._Router.navigate(['/details', id]);
  }


  addToFavorites(movie: IVideoContent) {
 
    console.log('Added to Favorites:', movie);
    if (!this.FavData.includes(movie.id)) {
      this.FavData.push(movie.id);
     // this.updateFavoritesInLocalStorage();
     // this._Router.navigate(['mylist'], { queryParams: { movieId: movie.id } });
    }
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Check if poster_path exists
    if (movie.poster_path && !favorites.find((fav: IVideoContent) => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this._snackBar.open('Movie added to favorites!', 'Close', {
        duration: 3000,  // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }
    else {
      // Display already exists toaster
      this._snackBar.open('Movie already in favorites!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-info']
      });
    }
    
  }
  private updateFavoritesInLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.FavData));
  }

  removeFromFavorites(movieId: number) {
    this.FavData = this.FavData.filter((id) => id !== movieId);
   // this.updateFavoritesInLocalStorage();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Remove the movie from local favorites
    favorites = favorites.filter((fav: IVideoContent) => fav.id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    this._snackBar.open('Movie removed from favorites!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
    });
}
}
