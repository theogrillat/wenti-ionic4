import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss'],
})
export class ShopPage implements OnInit {
  name = 'Boutique';
  goodsList;

  constructor(public auth: AuthService, public db: DbService) {}

  ngOnInit() {
    this.goodsList = this.getGoodsList();
  }


  addGood() {
    const min = 500;
    const max = 4000;
    const name = 'srgwd';
    const desc = 'efoiqefjohe oiqehf heqoifh oqiehfio qehlfe qehlgiqeh lihjqleih flqiuehgf elqih';
    const price = Math.floor(Math.random() * (+max - +min)) + +min;
    const good = {
      name,
      desc,
      price
    };
    console.log(good);
    this.db.updateAt(`goods/`, { name, desc, price });
  }


  async getGoodsList() {
    await this.db.collection$('goods').subscribe(val => this.goodsList = val);
  }

}
