import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    username:'',
    password:''
  }


  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  ConnexionUser( form: NgForm){
   // console.log(form.value);
    this._auth.loginUser(this.user)
      .subscribe(
        token => {
          console.log(token)
          localStorage.setItem('token', token.token)
          this._router.navigate(['/admin'])
        }
      )
  }

}
