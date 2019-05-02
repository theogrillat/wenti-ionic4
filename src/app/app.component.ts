import { MenuComponent } from './menu/menu.component';
import { Component } from '@angular/core';


import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    platform.ready().then(() => {

      if (this.platform.is('android')) {
          console.log('running on Android device!');
      }
      if (this.platform.is('ios')) {
          console.log('running on iOS device!');
      }
      if (this.platform.is('mobile')) {
          console.log('running in a browser on mobile!');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

