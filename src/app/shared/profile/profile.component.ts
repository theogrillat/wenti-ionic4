import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DbService } from '../../services/db.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @Input()
  user;

  constructor(
    private db: DbService,
    public auth: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  // firstName = this.splitName();
  // lastName = this.splitName();
  // playNbr: Number;
  // winNbr = 23;
  // cash: Number;
  // cashWin = `${this.cash} €`;

  // ngOnInit() {
  //   this.cash = 220;
  // }


  // async splitName () {
  //   const getName = async function() {
  //     let value;
  //     await this.user.subscribe(val => value = val);
  //     return await value;
  //   };
  //   let splitedName;
  //   const name = await getName();
  //   splitedName = name.split(' ');
  //   return splitedName[0];
  // }


}
