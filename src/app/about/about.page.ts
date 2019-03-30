import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { generate } from 'rxjs';

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
  coords;
  addr;
  gotCoords = false;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    public menu: MenuController
  ) { }

  click() {
    this.getCoords();
    // this.getAdress();
  }

  openMenu() {
    this.menu.open();
  }

  getCoords() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords;
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.coords.address = result[0];
        console.log(this.coords.address);
        this.gotCoords = true;
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
