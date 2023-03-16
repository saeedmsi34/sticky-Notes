import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  baseUrl:string='https://sticky-note-fe.vercel.app/';


  constructor(private _http:HttpClient ) { }
  addNote(data:object):Observable<any>
  {    
   return this._http.post(`${this.baseUrl}addNote`, data);
  }
  getAllNotes(data:object):Observable<any>
  {    
   return this._http.post(`${this.baseUrl}getUserNotes`, data);
  }
  
  editNote(note: any): Observable<any> {
    return this._http.put(this.baseUrl + "updateNote", note)
  }
  
  deleteNote(note:any):Observable<any>
  {   
    let options={
      headers:new HttpHeaders({

      }),
      body:{
        NoteID:note.NoteID,
        token:note.token
      }
    }
    


   return this._http.delete(`${this.baseUrl}deleteNote`, options);
  }
}


