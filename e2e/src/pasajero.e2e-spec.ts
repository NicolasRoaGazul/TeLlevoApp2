
import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';


describe('Testeo entrar como pasajero', () => {
  let page: AppPage;

  browser.driver.manage().window().maximize();

  beforeEach(() => {
    page = new AppPage();
  });

  it('Testeo registrar usuario', async() => {
    await browser.waitForAngularEnabled(false);
    await browser.driver.sleep(2000);
    await element(by.id('btnPasa')).click();
    await browser.driver.sleep(2000);
    const x = element(by.css('.bienvenido'));
    expect(await x.getText()).toEqual('¿Cómo quieres ingresar?');

  });
});