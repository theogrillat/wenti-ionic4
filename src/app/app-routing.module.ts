import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingGuard } from './guards/onboarding.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [OnboardingGuard] },
  { path: 'onboarding', loadChildren: './onboarding/onboarding.module#OnboardingPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
