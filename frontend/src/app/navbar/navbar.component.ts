import {Component, OnInit} from '@angular/core';
import {NewWishDialogComponent} from '../new-wish-dialog/new-wish-dialog';
import {WishListStore} from '../common/store/wishlist.store';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: MdDialog, private store: WishListStore) {
  }

  ngOnInit() {
  }

  openNewWishDialog(): void {
    const dialogRef = this.dialog.open(NewWishDialogComponent);
    dialogRef.afterClosed().subscribe((wish) => {
      if (wish) {
        this.store.wishes.unshift(wish);
      }
    });
  }

  deleteAll(): void {
    this.store.deleteAll();
  }
}
