import { Facebook } from '@ionic-native/facebook/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-signin-wenti',
  templateUrl: './signin-wenti.page.html',
  styleUrls: ['./signin-wenti.page.scss'],
})
export class SigninWentiPage implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private taptic: TapticEngine,
    private fb: Facebook,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  user;
  disposeMeGoogle;
  disposeMeFacebook;

  connectForm = true;
  signupForm = false;

  emailC: string;
  mdpC: string;


  userTag: string;
  emailS: string;
  mdpSOne: string;
  mdpSTwo: string;

  ngOnInit() {
  }


  async presentToast(msg, type) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      mode: 'ios',
      color: type
    });
    toast.present();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  vibrate2() {
    this.taptic.notification({
      type: 'success'
    });
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



  // connect() {
  //   this.auth.emailSignUp('info@wenti.fr', 'Theo33190');
  // }

  // back() {
  //   this.router.navigateByUrl('/signin');
  // }

  check() {
    console.log('changed');
  }


  toggleForm(which) {
    if (which === 'connect') {
      this.connectForm = true;
      this.signupForm = false;
    } else if (which === 'signup') {
      this.signupForm = true;
      this.connectForm = false;
    }
  }

  async connect() {
    const credentials = {
      email: this.emailC,
      password: this.mdpC
    };

    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 10000,
      mode: 'ios'
    });
    await loading.present();

    await this.delay(300);
    // await this.auth.signUpWithEmail(credentials);
    // this.router.navigateByUrl('/');
    await this.auth.signInWithEmail(credentials);

    await loading.dismiss();
    // this.router.navigateByUrl('./tabs/tabs.module#TabsPageModule');
  }

  async signUp() {
    console.log(this.userTag);
    console.log(this.emailS);
    console.log(this.mdpSOne);
    console.log(this.mdpSTwo);
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 10000,
      mode: 'ios'
    });
    await loading.present();
    await this.delay(300);
    const data = {
      displayName: this.userTag
    };

    if (this.mdpSOne === this.mdpSTwo) {
      const credentials = {
        email: this.emailS,
        password: this.mdpSOne
      };
      await this.auth.signUpWithEmail(credentials);
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.presentToast('Les mots de passe ne correspondent pas', 'danger');
    }
  }



}
