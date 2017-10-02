import {$, ElementFinder} from 'protractor';

export class AppNewWishDialogPo {
  public static titleInputField: ElementFinder = $('#titleInput');
  public static descriptionInputField: ElementFinder = $('#descriptionInput');
  public static postWishButton: ElementFinder = $('button[type=\'submit\']');
}
