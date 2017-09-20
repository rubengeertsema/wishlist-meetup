import {browser, ElementFinder, protractor} from 'protractor';

export class Helpers {

  public static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static waitToBeClickable(el: ElementFinder): ElementFinder {
    const ec = protractor.ExpectedConditions;
    browser.wait(ec.elementToBeClickable(el), 2000);
    return el;
  }
}
