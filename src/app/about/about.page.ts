import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {

  name = 'Infos';
  latitude = 0;
  longitude = 0;
  accur = 0;

  constructor(
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    public menu: MenuController
  ) { }


  openMenu() {
    this.menu.open();
  }

  getCoords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      this.latitude = resp.coords.latitude;
      console.log(resp.coords.longitude);
      this.longitude = resp.coords.longitude;
      this.accur = resp.coords.accuracy;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}