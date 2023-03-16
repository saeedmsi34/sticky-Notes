import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare var $: any


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStyleValid={'background-color':'gray','border-color':'gray'}
  isClicked=false
  isSuccess=false
  isEmailError=false
  isEmailMessageError=''
  ResponseMessage=''

  constructor(private _AuthService:AuthService,private _Router:Router ) {

  }

  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.pattern(/^[a-z][0-9]{3}$/)]),
    "age":new FormControl(null, [Validators.required]),


  })
  submitregister() {
    this.isClicked=true
    if (this.registerForm.invalid) {
      return

    }
    this._AuthService.signUp(this.registerForm.value).subscribe(response=>{
      if(response.message=='success')
      {
        this.isClicked=false
        this.isSuccess=true
        this.isEmailError=false
        this.ResponseMessage=response.message
        this.registerForm.reset()
        this._Router.navigate(['/sign-in'])
      }else{
        this.isEmailMessageError=response.errors.email.message
        this.isEmailError=true
        this.isClicked=false
        this.isSuccess=false
      }
      console.log(response)

    })


  }

  ngOnInit(): void {
    $('#signUp').particleground({
      density: 6000,
      dotColor: '#fff',
      lineColor: '#000'
    });
  }
}
