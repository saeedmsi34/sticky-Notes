import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { NotesService } from '../notes.service';
declare var $: any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  AllNotes: any = [];
  decoded: any
  token: any;
  isLoad: boolean = false;
  disabled: boolean = false;
  constructor(private _Router: Router, private _NotesService: NotesService, private _AuthService: AuthService) {
    try {
      this.token = localStorage.getItem('TOKEN');
      this.decoded = jwtDecode(this.token);
    }
    catch (error) {
      localStorage.clear()
      this._Router.navigate(['/sign-in'])
    }

    this.getAllNotes()

  }
  AddNotes: FormGroup = new FormGroup({
    "title": new FormControl('', [Validators.required]),
    "desc": new FormControl('', [Validators.required])
  })
  editNote: FormGroup = new FormGroup({
    "title": new FormControl('', [Validators.required]),
    "desc": new FormControl('', [Validators.required])
  })
 

  addData()
  {
    // this.isLoad = true
    // this.disabled = true
    let data = {
      title: this.AddNotes.value.title,
      desc: this.AddNotes.value.desc,
      token: this.token,
      citizenID: this.decoded._id
    }
    this._NotesService.addNote(data).subscribe(res => {
      console.log(res)
      if (res.message == 'success') {
        // add alert Done
        this.isLoad = false
        this.disabled = false
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2000,
        })
        $("#AddNote").modal('hide')
        this.AddNotes.reset()
        this.getAllNotes()
      }
    })







  }

  getAllNotes() {







    
    let data = {
      token: this.token,
      userID: this.decoded._id,
    }

    this._NotesService.getAllNotes(data).subscribe((res) =>{
      console.log(res)
      // if (res.message == 'success') {
        this.isLoad = false
        this.disabled = false
        this.AllNotes = res.Notes
      // } else {
      //   localStorage.clear()
      //   this._Router.navigate(['/sign-in'])
      // }

    })

    // if (!localStorage.getItem('TOKEN')) {
    //   this._Router.navigate(['/sign-in'])
    // }
  }
  //==================================================delete note======================================

  noteID: any
  getID(id: any) {
    this.noteID = id;
    console.log(id)
  }
  deleteNote() {
    let data = {
      NoteID: this.noteID,
      token: this.token,
    }
    this._NotesService.deleteNote(data).subscribe(res => {
      console.log(res)
      $('#DeleteNote').modal('hide');
      this.getAllNotes()

    })
  }
  // ==================================================Edit Note===================================
  
setValue(){
  for (let index = 0; index <this.AllNotes.length; index++) {
   if(this.AllNotes[index]._id==this.noteID)
   {
    // console.log(this.AllNotes[index])
     this.editNote.controls['title'].setValue(this.AllNotes[index].title)
    this.editNote.controls['desc'].setValue(this.AllNotes[index].desc)

   } 
    
  }
}

noteEdit(){
  let data={
    title:this.editNote.value.title,
    desc:this.editNote.value.desc,
    NoteID: this.noteID,
    token:this.token 

  }

this._NotesService.editNote(data).subscribe(res=>{
  console.log(res)
  if(res.message=='updated'){
    $('#EditNote').modal("hide")
    this.getAllNotes()
  }
})

}



  ngOnInit(): void {

  }
}













