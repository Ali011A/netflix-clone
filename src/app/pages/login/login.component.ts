declare var google: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _Router:Router){}
  ngOnInit(): void {
   google.accounts.id.initialize({
   client_id: '306354109434-g0uocra68qm13te1ksqrkatksdufjhet.apps.googleusercontent.com',
   // scope: ['https://www.googleapis.com/auth/youtube.readonly'],
   callback: (resp:any) => this.handlelogin(resp)
 });
 
 google.accounts.id.renderButton(document.getElementById('google-btn'),{
   type: 'standard',
   size: 'large',
   theme: 'filled_blue',
   text: 'Login with Google',
   shape:'rectangle',
   width: 250
   
 })
   
 }
 private decodeToken(token:string){
   return JSON.parse(atob(token.split(".")[1]))
 }
 
 
 handlelogin(response:any){
 //decode the token
 //store in session
 //navigate to home
 if(response){
 const payload=this.decodeToken(response.credential);
 sessionStorage.setItem("LoggedInUser",JSON.stringify(payload));
 document.body.style.overflowX = 'hidden';
 this._Router.navigate(['browse']);
 
 
 }
 
 
 }

}
