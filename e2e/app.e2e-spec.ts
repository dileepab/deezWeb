import { DeezWebPage } from './app.po';

describe('deez-web App', () => {
  let page: DeezWebPage;

  beforeEach(() => {
    page = new DeezWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
