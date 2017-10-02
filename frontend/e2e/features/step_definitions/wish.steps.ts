import {defineSupportCode} from 'cucumber';

import {AppNavbarPo} from '../../po/app-navbar.po';
import {AppNavbarMenuPo} from '../../po/app-navbar-menu.po';
import {AppNewWishDialogPo} from '../../po/app-new-wish-dialog.po';
import {Helpers} from '../../support/helpers';
import {expect} from '../../support/chai-imports';
import {AppWishlistPo} from '../../po/app-wishlist.po';

const ngApiMock = require('../../../.tmp/ngApimock/protractor.mock.js');

defineSupportCode(({Given, When, Then}) => {

  Given(/^six wishes$/, givenSixWishes);
  function givenSixWishes() {
    ngApiMock.selectScenario('getWishes', 'sixWishes');
  }

  When(/^I add a new wish$/, addNewWish);
  async function addNewWish() {
    await AppNavbarPo.menuButton.click();
    Helpers.waitToBeClickable(AppNavbarMenuPo.createNewWishButton).click();
    await AppNewWishDialogPo.titleInputField.sendKeys('Test title');
    await AppNewWishDialogPo.descriptionInputField.sendKeys('Test description');
    await AppNewWishDialogPo.postWishButton.click();
  }

  When(/^I delete a wish$/, deleteWish);
  async function deleteWish() {
    await AppWishlistPo.wishes.get(0).$('button').click();
  }

  When(/^I delete all wishes$/, deleteAllWishes);
  async function deleteAllWishes() {
    await AppNavbarPo.menuButton.click();
    Helpers.waitToBeClickable(AppNavbarMenuPo.deleteAllButton).click();
    // await Helpers.sleep(3000);
  }

  Then(/^there are "([^"]*)" wishes displayed$/, checkNumberOfWishes);
  async function checkNumberOfWishes(amount) {
    expect(await Helpers.getElementsCount(AppWishlistPo.wishes, +amount)).to.equal(+amount);
  }
});
