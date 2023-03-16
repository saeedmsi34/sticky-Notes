import { Injectable, OnInit } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  baseUrl:string='https://sticky-note-fe.vercel.app/';
  constructor(private _HttpClient:HttpClient ) {


   }
   signUp(data:any):Observable <any> {
    return this._HttpClient.post(this.baseUrl+'signup', data);

   }
   signIn(data:any):Observable <any> {
    return this._HttpClient.post(this.baseUrl+'signin', data);

   }




   isLoggedIn(){
    return !!localStorage.getItem('TOKEN')
   }

  ngOnInit(): void {
    
   
  }
   
}
