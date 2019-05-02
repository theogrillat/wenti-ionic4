import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router,
    private auth: AuthService
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isDone = await this.storage.get('onboardingDone');
    const uid = await this.auth.uid();
    console.log(uid);
    const isLoggedIn = !!uid;
    console.log('isLoggedIn: ' + isLoggedIn);
    // const isDone = false;

    if (!isDone) {
      this.router.navigateByUrl('/onboarding');
    } else {
      if (!isLoggedIn) {
        // const alert = await this.alertController.create({
        //   animated: true,
        //   translucent: true,
        //   header: 'Pas si vite !',
        //   message: 'Vous devez être connecté pour acceder à cette page',
        //   buttons: ['Se connecter']
        // });
        // await alert.present();
        this.router.navigateByUrl('/signin-wenti');
      }
    }

    return isDone;

  }
}
