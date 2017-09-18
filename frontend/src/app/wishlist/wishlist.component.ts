import {Component, OnInit} from '@angular/core';
import {Wish} from '../common/models/wish.model';
import {WishListStore} from '../common/store/wishlist.store';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishListComponent implements OnInit {

  constructor(public store: WishListStore) {
  }

  ngOnInit() {
  }

  getWishes(): void {
    this.store.getWhishes();
  }

  deleteWish(wish: Wish, i) {
    this.store.deleteWish(wish, i);
  }
}
