import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private gplus: GooglePlus,
    private fb: Facebook
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );


    this.handleRedirect();
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    const path = `users/${uid}`;

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous
    };

    return this.db.updateAt(path, data);
  }


  async presentToast(msg, type) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      mode: 'ios',
      color: type
    });
    toast.present();
  }


  async signOut() {
    await this.afAuth.auth.signOut();
    this.presentToast('Vous vous êtes bien déconnecté', 'success');
    return this.router.navigate(['/']);
  }

  // GOOGLE WEB

  setRedirect(val) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  async googleLogin() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 10000,
      mode: 'ios'
    });
    try {
      await loading.present();
      let user;
      if (this.platform.is('cordova')) {
        user = await this.nativeGoogleLogin();
      } else {
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
      }
      await loading.dismiss();
      this.presentToast('Ravie de vous revoir !', 'success');
      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
      await loading.dismiss();
    }
  }

  async signInWithEmail(cred) {
    return await this.afAuth.auth.signInWithEmailAndPassword(cred.email, cred.password).then(() => {
      this.presentToast('Ravie de vous revoir !', 'success');
      this.router.navigateByUrl('/');
    })
    .catch((err) => {
      console.log(err.code + ' | ' + err.message);
      let msg = '';
      switch (err.code) {
        case 'auth/wrong-password': {
          msg = 'Le mot de passe est incorrect';
          break;
        }
        case 'auth/user-not-found': {
          msg = "Aucun compte n'a été trouvé, veuillez en créer un";
          break;
        }
        case 'auth/invalid-email': {
          msg = "L'email est incorrect";
          break;
        }
        default: {
          msg = 'Une erreur est survenue, veuillez réessayer ultérieurement';
          break;
        }
      }
      this.presentToast(msg, 'danger');
    });
  }

  async signUpWithEmail(cred) {
    let user;
    console.log('Sign in with email');
    user = await this.afAuth.auth.createUserWithEmailAndPassword(cred.email, cred.password);
    console.log(user);
    console.log(user.user);
    return await this.updateUserData(user.user);
  }

  // emailSignUp(credentials: EmailPasswordCredentials): firebase.Promise<FirebaseAuthState> {
  //   return this.af.auth.createUser(credentials)
  //     .then(() => console.log("success"))
  //     .catch(error => console.log(error));
  // }


  async facebookLogin() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      duration: 10000,
      mode: 'ios'
    });
    try {
      await loading.present();
      let user;
      const loggingType = 'fb';
      user = await this.nativeFacebookLogin();
      // user.photoURL = await user.photoURL + '?height=500';
      // console.log(await user.photoURL);
      // this.db.updateAt(`users/${this.uid}`, {loggingType} );
      await loading.dismiss();
      this.presentToast('Ravie de vous revoir !', 'success');
      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
      await loading.dismiss();
    }
  }

  // s'occupe de l'Auth avec redirection pour web google auth

  private async handleRedirect() {
    // const loading = await this.loadingController.create();
    // await loading.present();
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const result = await this.afAuth.auth.getRedirectResult();
    if (result.user) {
      await this.updateUserData(result.user);
    }
    await this.setRedirect(false);
    // await loading.dismiss();
    return result;
  }

  async nativeGoogleLogin(): Promise<any> {
    // const loading = await this.loadingController.create();
    const gplusUser = await this.gplus.login({
      webClientId:
        '117074363015-atg5arks4oc0uuj7418vqjqqfsadaqun.apps.googleusercontent.com',
      offline: true,
      scope: 'profile email'
    });
    // await loading.present();
    return await this.afAuth.auth.signInWithCredential(
      auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
    // await loading.dismiss();
  }

  // async emailSignUp(email, password) {
  //   if (email && password) {
  //     return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //   } else {
  //     console.error('ERROR SINGNING UP');
  //   }
  // }

  // emailSignUp(email: string, password: string) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       this.updateUserData(user);
  //     })
  //     .catch(error => console.log(error));
  // }

  async nativeFacebookLogin(): Promise<any> {
    const fbUser = await this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((response: FacebookLoginResponse) => {
        return response.authResponse;
      });
      console.log(await fbUser.userID);
      return await this.afAuth.auth.signInWithCredential(
        auth.FacebookAuthProvider.credential(fbUser.accessToken)
      );
  }




  uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }


}
