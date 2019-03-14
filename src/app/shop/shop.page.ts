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
  clicked = false;

  constructor(public auth: AuthService, public db: DbService) {}

  ngOnInit() {
    this.goodsList = this.getGoodsList();
  }

  toggle() {
    if (this.clicked) {
      this.clicked = false;
    } else {
      this.clicked = true;
    }
  }



  addGood() {
    const min = 10;
    const max = 50;
    const name = 'Good';
    const img = 'http://wenti.fr/img/icon.png';
    const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis egestas justo.';
    const price = (Math.floor(Math.random() * (+max - +min)) + +min) * 100;
    const good = {
      name,
      desc,
      price,
      img
    };
    console.log(good);
    this.db.updateAt(`goods/`, { name, desc, price, img });
  }


  async getGoodsList() {
    await this.db.collection$('goods').subscribe(val => {
      this.goodsList = val;
      // console.log(val);
      let i = 1;
      this.goodsList.forEach(el => {
        el.nbr = i;
        // console.log(i);
        i = i + 1;
      });
      // console.log(this.goodsList);
    });
  }

}
