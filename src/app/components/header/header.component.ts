import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() userImg: string = '';
  //name: string = '';
  constructor(private _AuthService:AuthService,private _Router:Router){   
   }
   name=JSON.parse(sessionStorage.getItem("LoggedInUser")!).name;
  //items = ['Home', 'TV Show', 'News & popular', 'Featured', 'My List', 'Browse By Language'];

signOut(){
  sessionStorage.removeItem('LoggedInUser');
  this._AuthService.SignOut();
  

}
}
