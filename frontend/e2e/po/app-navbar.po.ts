import {by, element} from 'protractor';

export class AppNavbarPo {

  public static async clickMenuButton() {
    await element(by.id('menuButton')).click();
  }
}
