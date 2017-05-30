import { SistemaVentaCarnesPage } from './app.po';

describe('sistema-venta-carnes App', () => {
  let page: SistemaVentaCarnesPage;

  beforeEach(() => {
    page = new SistemaVentaCarnesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
