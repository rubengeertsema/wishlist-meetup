import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {EditWishComponent} from './edit-wish/edit-wish.component';
import {NotFoundComponent} from './not-found/not-found.component';

const appRoutes: Routes = [
  {path: 'edit-wish', component: EditWishComponent},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {preloadingStrategy: PreloadAllModules, useHash: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
