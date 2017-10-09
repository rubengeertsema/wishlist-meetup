import {defineSupportCode} from 'cucumber';

import {AppNavbarPo} from '../../po/app-navbar.po';
import {AppNavbarMenuPo} from '../../po/app-navbar-menu.po';
import {AppNewWishDialogPo} from '../../po/app-new-wish-dialog.po';
import {Helpers} from '../../support/helpers';
import {expect} from '../../support/chai-imports';
import {AppWishlistPo} from '../../po/app-wishlist.po';
import {browser} from 'protractor';

const ngApiMock = require('../../../.tmp/ngApimock/protractor.mock.js');

defineSupportCode(({Given, When, Then}) => {

  const mockScenarios = {
    0: ['getWishes', 'zeroWishes'],
    6: ['getWishes', 'sixWishes']
  };

  Given(/^"([^"]*)" wishes$/, async (amount) => {
    ngApiMock.selectScenario(...mockScenarios[+amount]);
    await browser.get('/');
  });

  When(/^I add a new wish$/, async () => {
    await AppNavbarPo.menuButton.click();
    Helpers.waitToBeClickable(AppNavbarMenuPo.createNewWishButton).click();
    await AppNewWishDialogPo.titleInputField.sendKeys('Test title');
    await AppNewWishDialogPo.descriptionInputField.sendKeys('Test description');
    await AppNewWishDialogPo.postWishButton.click();
  });

  When(/^I delete a wish$/, async () => {
    await AppWishlistPo.wishes.get(0).$('button').click();
  });

  When(/^I delete all wishes$/, async () => {
    await AppNavbarPo.menuButton.click();
    Helpers.waitToBeClickable(AppNavbarMenuPo.deleteAllButton).click();
  });

  Then(/^there are "([^"]*)" wishes displayed$/, async (amount) => {
    expect(await Helpers.getElementsCount(AppWishlistPo.wishes, +amount)).to.equal(+amount);
  });
});
