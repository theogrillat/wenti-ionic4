
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';
import { PlayPage } from './../play/play.page';
import { ShopPage } from '../shop/shop.page';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage,
        canActivate: [AuthGuard]
      },
      {
        path: 'about',
        outlet: 'about',
        component: AboutPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'play',
        outlet: 'play',
        component: PlayPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'shop',
        outlet: 'shop',
        component: ShopPage,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
