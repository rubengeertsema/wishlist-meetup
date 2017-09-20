import {defineSupportCode} from 'cucumber';

import {AppNavbarPo} from '../../po/app-navbar.po';
import {AppNavbarMenuPo} from '../../po/app-navbar-menu.po';
import {AppNewWishDialogPo} from '../../po/app-new-wish-dialog.po';

defineSupportCode(({When}) => {

  When('I add a new wish', addNewWish);
  async function addNewWish() {
    await AppNavbarPo.clickMenuButton();
    await AppNavbarMenuPo.clickCreateNewWishButton();
    await AppNewWishDialogPo.enterTitle('Test title');
    await AppNewWishDialogPo.enterDescription('Test description');
    await AppNewWishDialogPo.clickPostWishButton();
  }
});
