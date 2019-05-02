import { LoadingController } from '@ionic/angular';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
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

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: Facebook,
    private taptic: TapticEngine,
    private loadingController: LoadingController
  ) { }

  vibrate2() {
    this.taptic.notification({
      type: 'success'
    });
  }


  // async getUserByAuth() {
  //   return await this.auth.user$;
  // }

  wenti() {
    this.vibrate2();
    this.router.navigateByUrl('/signin-wenti');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async google() {
    this.vibrate2();



    await this.delay(300);
    // this.isLogging = true;
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
    this.vibrate2();
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 10000,
      mode: 'ios'
    });
    await loading.present();
    await this.delay(300);
    // this.isLogging = true;
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
    await loading.dismiss();
  }

  go() {
    this.vibrate2();
    console.log('ok');
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    console.log('ngDestroy');
  }

}
