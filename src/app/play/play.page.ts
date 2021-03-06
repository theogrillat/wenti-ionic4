import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-play',
  templateUrl: 'play.page.html',
  styleUrls: ['play.page.scss'],
})
export class PlayPage implements OnInit {

  constructor(
    private db: DbService,
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    public menu: MenuController,
    private taptic: TapticEngine
  ) {}

  name = 'Jouer';
  userData;
  addPoints = 200;
  addPlay = 1;
  addWin = 1;
  addCashWin = 20;
  addMedals = 1;
  quest;

  ngOnInit() {
    // this.userData = this.getUserData();
    this.quest = this.getItems();
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

  openMenu() {
    this.vibrate2();
    this.menu.open();
  }


  async getItems() {
    return await this.db.collection$('questions', ref =>
    ref
      .where('isTheOne', '==', true)
      .limit(10)
    ).subscribe(val => {
      this.quest = val;
      console.log(val);
      console.log(this.quest);
    });
}

  async getUserData () {
    return await this.auth.user$.subscribe(val => this.userData = val);
  }

  async updatePoints (bool) {
    this.vibrate2();
    const addPoints = this.addPoints;
    const subPoints = this.addPoints;
    const currentUserPoints = this.userData.points;
    let points;
    if (bool) {
      if (isNaN(currentUserPoints)) {
        points = 0 + addPoints;
      } else {
        points = currentUserPoints + addPoints;
      }
    } else {
      if (isNaN(currentUserPoints) || currentUserPoints === 0) {
        points = 0;
      } else {
        points = currentUserPoints - subPoints;
      }
    }
    this.db.updateAt(`users/${this.userData.uid}`, { points });
  }
  async updateMedals (bool) {
    this.vibrate2();
    const addMedals = this.addMedals;
    const subMedals = this.addMedals;
    const currentUserMedals = this.userData.medals;
    let medals;
    if (bool) {
      if (isNaN(currentUserMedals)) {
        medals = 0 + addMedals;
      } else {
        medals = currentUserMedals + addMedals;
      }
    } else {
      if (isNaN(currentUserMedals) || currentUserMedals === 0) {
        medals = 0;
      } else {
        medals = currentUserMedals - subMedals;
      }
    }
    this.db.updateAt(`users/${this.userData.uid}`, { medals });
  }


  async updatePlay (bool) {
    this.vibrate2();
    const addPlay = this.addPlay;
    const subPlay = this.addPlay;
    const currentUserPlay = this.userData.playNbr;
    let playNbr;
    if (bool) {
      if (isNaN(currentUserPlay)) {
        playNbr = 0 + addPlay;
      } else {
        playNbr = currentUserPlay + addPlay;
      }
    } else {
      if (isNaN(currentUserPlay) || currentUserPlay === 0) {
        playNbr = 0;
      } else {
        playNbr = currentUserPlay - subPlay;
      }
    }
    this.db.updateAt(`users/${this.userData.uid}`, { playNbr });
  }


async updateWin (bool) {
  this.vibrate2();
  const addWin = this.addWin;
  const subWin = this.addWin;
  const currentUserWin = this.userData.winNbr;
  let winNbr;
  if (bool) {
    if (isNaN(currentUserWin)) {
      winNbr = 0 + addWin;
    } else {
      winNbr = currentUserWin + addWin;
    }
  } else {
    if (isNaN(currentUserWin) || currentUserWin === 0) {
      winNbr = 0;
    } else {
      winNbr = currentUserWin - subWin;
    }
  }
  this.db.updateAt(`users/${this.userData.uid}`, { winNbr });
}

async updateCash (bool) {
  this.vibrate2();
  const addCashWin = this.addCashWin;
  const subCashWin = this.addCashWin;
  const currentUserCashWin = this.userData.cashWinNbr;
  let cashWinNbr;
  if (bool) {
    if (isNaN(currentUserCashWin)) {
      cashWinNbr = 0 + addCashWin;
    } else {
      cashWinNbr = currentUserCashWin + addCashWin;
    }
  } else {
    if (isNaN(currentUserCashWin) || currentUserCashWin === 0) {
      cashWinNbr = 0;
    } else {
      cashWinNbr = currentUserCashWin - subCashWin;
    }
  }
  this.db.updateAt(`users/${this.userData.uid}`, { cashWinNbr });
}
}
