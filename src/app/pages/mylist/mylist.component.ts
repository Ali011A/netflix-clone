import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IVideoContent } from 'src/app/interface/video-content';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent {

  favoriteMovies: IVideoContent[] = [];
  FavData: number[] = [];
  selectedContent: string | null = null;
  UserProfImg=JSON.parse(sessionStorage.getItem("LoggedInUser")!).picture;
  constructor(private _Router:Router,private _snackBar: MatSnackBar){}
  ngOnInit() {
    // const storedFavorites = localStorage.getItem('favorites');
    // if (storedFavorites) {
    //   this.favoriteMovies = JSON.parse(storedFavorites);
    // }
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        const favorites: IVideoContent[] = JSON.parse(storedFavorites);
        // Filter out duplicates based on movie id
        this.favoriteMovies = Array.from(new Set(favorites.map(a => a.id)))
            .map(id => favorites.find(a => a.id === id)!);
    }
    // const storedFavorites = localStorage.getItem('favorites');
    // this.FavData = storedFavorites ? JSON.parse(storedFavorites) : [];
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

  removeFromFavorites(movieId: number) {
    // Update the FavData array
    this.FavData = this.FavData.filter((id) => id !== movieId);
    
 
    this.favoriteMovies = this.favoriteMovies.filter((movie) => movie.id !== movieId);
    
    // Update local storage
    this.updateFavoritesInLocalStorage();
    this._snackBar.open('Movie removed from favorites!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }
  private updateFavoritesInLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.FavData));
  }

  addToFavorites(movie: IVideoContent) {
    console.log('Added to Favorites:', movie);
    if (!this.FavData.includes(movie.id)) {
        this.FavData.push(movie.id); // Add movie ID to FavData
        this.updateFavoritesInLocalStorage();
        // Logic for storing the full movie object in favorites
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (movie.poster_path && !favorites.find((fav: IVideoContent) => fav.id === movie.id)) {
            favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this._snackBar.open('Movie added to favorites!', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-success']
            });
        }
    } else {
        this._snackBar.open('Movie already in favorites!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-info']
        });
    }
}
}
