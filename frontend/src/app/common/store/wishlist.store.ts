import {Injectable} from '@angular/core';
import {WishListService} from '../services/wishlist.service';
import {Wish} from '../models/wish.model';

// TODO: implement ngrx for state management
@Injectable()
export class WishListStore {

  wishes: Wish[];

  constructor(private wishListService: WishListService) {
  }

  getWhishes(): void {
    this.wishListService.getWishes()
      .subscribe((wishes) => {
        console.log(wishes);
        this.wishes = wishes;
      }, error => {
        console.log('Could not load wishes.');
      });
  }

  getWish(id: String): Wish {
    return this.wishes.filter(wish => wish.id === id)[0];
  }

  addWish(wish: Wish) {
    this.wishListService.postWish(wish).subscribe((res) => {
      console.log(`Posted wish ${res}`);
      this.wishes.unshift(res);
    }, error => {
      console.log(`Could not add wish ${wish}`)
    });
  }

  deleteWish(wish: Wish, i: number) {
    this.wishListService.deleteWish(wish)
      .subscribe((res) => {
        console.log(res);
        this.wishes.splice(i, 1);
      }, error => {
        console.log('Could not delete wish.');
      });
  }

  deleteAll() {
    this.wishListService.deleteAll()
      .subscribe(() => {
        this.wishes = [];
      }, error => {
        console.log('Could not delete wishes.');
      });
  }
}
