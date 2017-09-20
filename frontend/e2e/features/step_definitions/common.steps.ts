import {defineSupportCode} from 'cucumber';
import {browser} from 'protractor';

defineSupportCode(({Before}) => {
  Before(() => {
    browser.get('/');
  });
});
