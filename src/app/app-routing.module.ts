import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { DetailsComponent } from './pages/details/details.component';
import { FeaturedComponent } from './pages/featured/featured.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';
import { MylistComponent } from './pages/mylist/mylist.component';
import { NewspopularComponent } from './pages/newspopular/newspopular.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  
  {path:"browse",component:BrowseComponent,canActivate: [authGuard]},
  { path: 'details/:id', component: DetailsComponent,canActivate: [authGuard] },
  {path:"featured",component:FeaturedComponent,canActivate: [authGuard]},
 {path:"tvshow",component:TvshowsComponent,canActivate: [authGuard]},
 {path:"mylist",component:MylistComponent,canActivate: [authGuard]},
 {path:"newspopular",component:NewspopularComponent,canActivate: [authGuard]},
  {path:"**", redirectTo:"login", pathMatch:"full"} //for 404 error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
