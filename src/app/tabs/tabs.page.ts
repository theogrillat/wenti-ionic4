import { Component } from '@angular/core';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private taptic: TapticEngine) {}


  vibrate2() {
    this.taptic.notification({
      type: 'success'
    });
  }

  tabHome () {
    this.vibrate2();
    console.log('Home');
  }

  tabPlay () {
    this.vibrate2();
    console.log('Play');
  }

  tabAbout () {
    this.vibrate2();
    console.log('About');
  }

}
