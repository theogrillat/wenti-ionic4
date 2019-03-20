import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabHome () {
    console.log('Home');
  }

  tabPlay () {
    console.log('Play');
  }

  tabAbout () {
    console.log('About');
  }

}
