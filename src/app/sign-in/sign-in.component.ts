import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
declare var $: any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isStyleInvalid = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }
  isStyleValid = { 'background-color': 'gray', 'border-color': 'gray' }
  isClicked = false
  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(['/profile'])

    }
  }
  signinForm: FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.pattern(/^[a-z][0-9]{3}$/)]),


  })
  submitsignIn() {
    this.isClicked = true

    if (this.signinForm.invalid) {
      return

    }
    this._AuthService.signIn(this.signinForm.value).subscribe(res => {
      if (res.message == 'success') {
        // // Alert Show
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        localStorage.setItem('TOKEN', res.token)

        this.isClicked = false
        this._Router.navigateByUrl("profile")
      }
    })
    console.log(this.signinForm)

  }
  ngOnInit(): void {
    $('#signIn').particleground({
      density: 6000,
      dotColor: '#fff',
      lineColor: '#000'
    });
  }


}








