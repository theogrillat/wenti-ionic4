import { MenuController, Platform } from '@ionic/angular';
import { DbService } from './../services/db.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginComponent } from '../shared/login/login.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';

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
    private router: Router,
    private menu: MenuController,
    private vibration: Vibration,
    private taptic: TapticEngine,
    private platform: Platform) { }

  name = 'Mon Profil';
  userData;
  home = true;
  schoolForm = false;
  schoolInput = '';
  schoolFinal = '';
  schools;
  schoolList = [];
  userState;
  hasSchool = false;
  userPhoto = '';
  more = true;

  async ngOnInit() {
    this.userData = this.getUserData();
    this.schools = this.setList();
    this.userPhoto = await this.checkPhotoURL();
    console.log(this.userPhoto);
    console.log('INIT');
  }



  openMenu() {
    this.vibrate2();
    this.menu.open();
  }


  ngAfterViewInit() {
    console.log('NEXT');
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  async checkPhotoURL() {


    for (let i = 0; i < 3000; i++) {
      const test = await this.userData.photoURL;
      console.log(test);
      if (test !== undefined) {
        console.log('LOOOOP STOOOOP');
        i = 3000;
      }
      console.log('iteration: ' + i);
      await this.delay(10);
    }

    let newURL = '';

    if (await this.userData.photoURL === null || await this.userData.photoURL === undefined) {
      newURL = '../../assets/img/avatar.png';
    } else {
      const oldURL = await this.userData.photoURL;
      if (await oldURL.includes('/s96')) {
        newURL = await oldURL.split('/s96').join('/s500');
      } else {
        newURL = await oldURL + '?height=500';
      }
    }


    console.log(await newURL);
    return await newURL;
  }

  async getUserData () {
    return await this.auth.user$.subscribe(val => this.userData = val);
  }

  addSchool(bool) {
    this.vibrate2();
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
    this.vibrate2();
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
    console.log('SET-STATE');
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

  vibrate1() {
    this.taptic.selection();
  }

  vibrate2() {
    this.taptic.notification({
      type: 'success'
    });
  }

  vibrate3() {
    this.taptic.impact({
      style: 'heavy'
    });
  }

  goSettings() {
    this.vibrate2();
    this.home = false;
    this.more = false;
  }


  goBack() {
    this.vibrate2();
    this.home = true;
    this.more = true;
  }

  signOut() {
    this.vibrate2();
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('/signin-wenti');
    });
  }
}
