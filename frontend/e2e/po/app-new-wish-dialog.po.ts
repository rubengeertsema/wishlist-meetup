import {element, by} from 'protractor';

export class AppNewWishDialogPo {

  public static async enterTitle(title: string) {
    await element(by.id('titleInput')).sendKeys(title);
  }

  public static async enterDescription(description: string) {
    await element(by.id('descriptionInput')).sendKeys(description);
  }

  public static async clickPostWishButton() {
    await element(by.css('button[type=\'submit\']')).click();
  }
}
