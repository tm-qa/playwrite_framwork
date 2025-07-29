// pages/NinjaPage.ts
import { Page, expect } from '@playwright/test';
import { label, description, attachment } from 'allure-js-commons';


export class NinjaPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginToGmailAndNinja(email: string, password: string) {
   
    const ninjaUrl = process.env.NINJA_URL || 'https://ninja.sanity.turtle-feature.com/';
    await this.page.goto(ninjaUrl);
    await this.page.waitForLoadState('networkidle');
    console.log('Navigated to Ninja login page');
    const screenshot = await this.page.screenshot();
    attachment('Login Page Screenshot', screenshot, 'image/png');

   const [popup] = await Promise.all([
    this.page.context().waitForEvent('page'), 
    this.page.locator('//span/a[@id="google-signin-button"]').click() 
  ]);

  await popup.waitForLoadState('load');
  console.log('Google login popup opened');


  await popup.locator('#identifierId').fill(email);
  debugger;
  await popup.locator('#identifierNext').click();
  await popup.waitForSelector('input[name="Passwd"]', { timeout: 10000 });
  await popup.locator('input[name="Passwd"]').fill(password);
  await popup.locator('#passwordNext').click();

  console.log(' Email and password submitted');

  await this.page.waitForTimeout(10000);
}

async clickOnModule (module : string ){
  await this.page.waitForTimeout(3000);
  const screenshot1 = await this.page.screenshot();
  attachment('Login Page Screenshot', screenshot1, 'image/png');
  const moduleLocator = this.page.locator('a[data-auto="qis-module"]');
  await moduleLocator.waitFor({ state: 'visible', timeout: 5000 });
  await moduleLocator.click();
  console.log(' Clicked on Quote Request module');

  attachment('Login Page Screenshot', screenshot1, 'image/png');

}


}