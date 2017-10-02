import {$, ElementFinder} from 'protractor';

export class AppNavbarMenuPo {
  public static createNewWishButton: ElementFinder = $('#createNewWishDialogButton');
  public static deleteAllButton: ElementFinder = $('#deleteAllButton');
}
