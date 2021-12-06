
import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';


describe('Testeo Register', () => {
  let page: AppPage;

  browser.driver.manage().window().maximize();

  beforeEach(() => {
    page = new AppPage();
  });

  it('Testeo registrar usuario', async() => {
    await browser.waitForAngularEnabled(false);
    await browser.driver.sleep(2000);
    await element(by.id('btnRegister')).click();
    await browser.driver.sleep(2000);
    await element(by.id('inputName')).sendKeys('Nico');
    await browser.driver.sleep(2000);
    await element(by.id('inputEmail')).sendKeys('nico@gmail.com');
    await browser.driver.sleep(2000);
    await element(by.id('inputContraseña')).sendKeys('aaa');
    await browser.driver.sleep(2000);
    await element(by.id('inputCContraseña')).sendKeys('aaa');
    await browser.driver.sleep(2000);
    await element(by.id('btnReg')).click();
    await browser.driver.sleep(2000);
    const x = element(by.css('.bienvenido'));
    expect(await x.getText()).toEqual('¿Cómo quieres ingresar?');

  });
});

/* 
await browser.driver.sleep(2000);
await element(by.id('btnRegister')).click();
await browser.driver.sleep(2000);
await element(by.id('inputName')).sendKeys('Nico');
await browser.driver.sleep(2000);
await element(by.id('inputEmail')).sendKeys('nico@gmail.com');
await browser.driver.sleep(2000);
await element(by.id('inputContraseña')).sendKeys(123);
await browser.driver.sleep(2000);
await element(by.id('inputCContraseña')).sendKeys(123);
await browser.driver.sleep(2000);
await element(by.id('btnReg')).click();
await browser.driver.sleep(2000);
const x = element(by.css('.bienvenido'));
expect(await x.getText()).toEqual('¿Cómo quieres ingresar?'); */