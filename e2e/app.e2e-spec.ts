import { BluecoatPage } from './app.po';

describe('bluecoat App', function() {
  let page: BluecoatPage;

  beforeEach(() => {
    page = new BluecoatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
