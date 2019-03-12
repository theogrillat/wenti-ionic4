import { Facebook } from '@ionic-native/facebook/ngx';
import { Component, OnDestroy } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.page.html',
  styleUrls: ['signin.page.scss'],
})
export class SigninPage implements OnDestroy {

  pageName = 'Connexion';
  isLogging = false;
  user;
  disposeMeGoogle;
  disposeMeFacebook;

  constructor(public auth: AuthService, private router: Router, private fb: Facebook) { }



  // async getUserByAuth() {
  //   return await this.auth.user$;
  // }

  async google() {
    this.isLogging = true;
    this.auth.googleLogin();
    console.log('google');
    this.disposeMeGoogle = this.auth.user$.subscribe(val => {
      if (val) {
        // console.log('gogogoggoogogo');
        this.disposeMeGoogle.unsubscribe();
        this.go();
      } else {
        console.error('failed');
      }
    });
    // console.log(await this.user);
  }


  async facebook() {
    this.isLogging = true;
    this.auth.facebookLogin();
    console.log('facebook');
    this.disposeMeFacebook = this.auth.user$.subscribe(val => {
      if (val) {
        // console.log('gogogoggoogogo');
        this.disposeMeFacebook.unsubscribe();
        this.go();
      } else {
        console.error('failed');
      }
    });
  }

  go() {
    console.log('ok');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    console.error('ngDestroy');
  }

}
