import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdButtonModule, MdCardModule, MdDialog, MdDialogModule, MdIconModule, MdInputModule, MdListModule, MdMenuModule,
  MdToolbarModule} from '@angular/material';
import 'hammerjs';

import {AppComponent} from './app.component';
import {NewWishDialogComponent} from './new-wish-dialog/new-wish-dialog';
import {WishListService} from './common/services/wishlist.service';
import {WishListStore} from './common/store/wishlist.store';
import {TruncatePipe} from './pipes/truncate';
import {AppRoutingModule} from './app-routing.module';
import {EditWishComponent} from './edit-wish/edit-wish.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NavbarComponent} from './navbar/navbar.component';
import {WishListComponent} from './wishlist/wishlist.component';
import { WishComponent } from './wish/wish.component';

@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    NewWishDialogComponent,
    EditWishComponent,
    NotFoundComponent,
    NavbarComponent,
    WishListComponent,
    WishComponent
  ],
  entryComponents: [
    NewWishDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdDialogModule,
    AppRoutingModule
  ],
  providers: [
    MdDialog,
    WishListService,
    WishListStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
