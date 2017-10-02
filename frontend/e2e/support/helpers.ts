import {browser, ElementArrayFinder, ElementFinder, protractor} from 'protractor';

export class Helpers {

  private static globalTimeout = 2000;

  public static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public static waitToBeClickable(el: ElementFinder): ElementFinder {
    const ec = protractor.ExpectedConditions;
    browser.wait(ec.elementToBeClickable(el), this.globalTimeout);
    return el;
  }

  public static async getElementsCount(elArray: ElementArrayFinder, expectedCount: number): Promise<number> {
    const datetime = new Date();
    const timeout = datetime.setMilliseconds(datetime.getMilliseconds() + this.globalTimeout);

    let actualCount: number = await elArray.count();
    while (actualCount !== expectedCount && new Date().getTime() < timeout) {
      console.log(`Actual count [${actualCount}] does not match expected count [${expectedCount}]. Trying again...`);
      actualCount = await elArray.count();
      await this.sleep(100);
    }

    return actualCount;
  }
}
