import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { DetailsComponent } from './pages/details/details.component';
import { FooterComponent } from './pages/footer/footer.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { MylistComponent } from './pages/mylist/mylist.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';
import { LoginComponent } from './pages/login/login.component';
import { NewspopularComponent } from './pages/newspopular/newspopular.component';
import { MovieCursolComponent } from './shared/components/movie-cursol/movie-cursol.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    DetailsComponent,
    FooterComponent,
    BrowseComponent,
    FeaturedComponent,
    MylistComponent,
    TvshowsComponent,
    LoginComponent,
    NewspopularComponent,
    MovieCursolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
