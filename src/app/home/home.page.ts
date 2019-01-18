import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  pageName = 'Profile';
  userData;
  home = true;

  ngOnInit() {
    this.userData = this.getUserData();
  }

  async getUserData () {
    return await this.auth.user$.subscribe(val => this.userData = val);
  }

  goSettings() {
    this.home = false;
  }
  goBack() {
    this.home = true;
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/signin');
    });
  }
}
