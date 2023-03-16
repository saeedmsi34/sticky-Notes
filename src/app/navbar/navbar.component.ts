import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public _AuthService:AuthService,public _Router:Router){
  }
  logout(){
    localStorage.clear()
    this._Router.navigate(['/sign-in'])
  }

}
