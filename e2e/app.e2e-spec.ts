import { BetterdayPage } from './app.po';

describe('betterday App', () => {
  let page: BetterdayPage;

  beforeEach(() => {
    page = new BetterdayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
