import { DbService } from './../services/db.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, AfterViewInit {

  constructor(
    public firebase: Firebase,
    private db: DbService,
    private auth: AuthService,
    private router: Router) { }

  pageName = 'Profile';
  userData;
  home = true;
  schoolForm = false;
  schoolInput = '';
  schoolFinal = '';
  schools;
  schoolList = [];
  userState;
  hasSchool = false;

  ngOnInit() {
    this.userData = this.getUserData();
    this.schools = this.setList();
    console.log('INIT');
  }

  ngAfterViewInit() {
    console.log('NEXT');
  }

  async getUserData () {
    return await this.auth.user$.subscribe(val => this.userData = val);
  }

  addSchool(bool) {
    this.setState();
    if (bool) {
      this.schoolForm = true;
    } else {
      this.schoolForm = false;
    }
  }


  // sort() {
  //   for (let school of this.schools) {
  //     this.
  //   }
  // }



  async validate() {
    console.log(this.schoolFinal);
    const school = this.schoolFinal;
    const err = 'errrrr';
    if (await this.userData.school) {
      // this.db.updateAt(`users/${this.userData.uid}`, { err });
      this.hasSchool = false;
    } else {
      this.db.updateAt(`users/${this.userData.uid}`, { school });
      this.hasSchool = true;
    }
  }

  async setState() {
    console.log(await this.userData.school);
    if (await this.userData.school) {
      this.hasSchool = true;
      console.log('hasSchool: ' + this.hasSchool);
      console.log('User school: ' + this.userData.school);
    } else {
      this.hasSchool = false;
      console.log('hasSchool: ' + this.hasSchool);
      console.log('User school: ' + this.userData.school);
    }
  }

  async setList() {
    await this.db.collection$('schools').subscribe(val => this.schools = val);
  }


  testFunction() {
    fetch('https://us-central1-wenti-ionic4.cloudfunctions.net/helloWorld', {mode: 'no-cors'})
    .then(function (response) {
      response.text()
          .then(function (value) {
              console.log(value);
          });
  })
  .catch(console.error);
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
