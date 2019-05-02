import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Promise<boolean> {
    const uid = await this.auth.uid();
    const isLoggedIn = !!uid;

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

    return isLoggedIn;
  }
}
