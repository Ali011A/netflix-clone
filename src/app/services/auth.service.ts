declare var google:any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _Router:Router) { }

  SignOut(){
    google.accounts.id.disableAutoSelect();
    this._Router.navigate(['/login']);
 }
}
