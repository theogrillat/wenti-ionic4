import { Component } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.page.html',
  styleUrls: ['signin.page.scss'],
})
export class SigninPage {

  pageName = 'Connexion';

  constructor(public auth: AuthService, private router: Router) { }

  go () {
    console.log('ok');
    this.router.navigateByUrl('/');
  }

}
