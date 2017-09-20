import {by, element} from 'protractor';
import {Helpers} from '../support/helpers';

export class AppNavbarMenuPo {

  public static async clickCreateNewWishButton() {
    Helpers.waitToBeClickable(element(by.id('createNewWishDialogButton'))).click(); // TODO: is this ok?
    await element(by.id('newWishDialog')).isDisplayed(); // TODO: add an actual check for this
  }

  public static async clickDeleteAllButton() {
    Helpers.waitToBeClickable(element(by.id('deleteAllButton'))).click();
  }
}
