import { WishListPage } from './app.po';

describe('WishList App', () => {
  let page: WishListPage;

  beforeEach(() => {
    page = new WishListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
