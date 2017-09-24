import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {WishListStore} from '../common/store/wishlist.store';
import {Wish} from '../common/models/wish.model';

@Component({
  selector: 'app-new-wish-dialog',
  templateUrl: './new-wish-dialog.html',
  styleUrls: ['./new-wish-dialog.css']
})
export class NewWishDialogComponent implements OnInit {

  title = '';
  description = '';
  maxTitleLength = 100;
  maxDescriptionLength = 300;

  constructor(public dialogRef: MdDialogRef<NewWishDialogComponent>,
              private store: WishListStore) {
  }

  ngOnInit(): void {
  }

  postWish() {
    const wish: Wish = new Wish(null, this.title, this.description, null);
    this.store.addWish(wish);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
