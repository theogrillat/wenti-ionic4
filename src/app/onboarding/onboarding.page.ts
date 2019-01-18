import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {

  logoPath = '../../assets/img/icon.png';

  constructor(private storage: Storage, private router: Router) {}

  async finish() {
    await this.storage.set('onboardingDone', true);
    await this.router.navigateByUrl('/');
  }
}
