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

try {
  const empIdInput = await this.page.locator('input[placeholder="Enter your employee ID"]');
  await empIdInput.waitFor({ state: 'visible', timeout: 5000 });
  await empIdInput.fill('FBS4825');
  await this.page.getByRole('button', { name: 'Next' }).click();
  console.log(' Employee ID entered successfully.');
} catch (e) {
  console.log('Employee ID input not found or not visible.');
  const screenshot = await this.page.screenshot();
  attachment('Emp ID Screen Failure', screenshot, 'image/png');
}



await this.page.waitForTimeout(10000);

  await this.page.waitForTimeout(10000);
}

async clickOnModule(module: string) {
  const moduleLocator = this.page.locator(`a[data-auto="qis-module"]`);

  
  await moduleLocator.waitFor({ state: 'visible', timeout: 10000 });

  
  const preClickScreenshot = await this.page.screenshot();
  attachment('Before Clicking Module', preClickScreenshot, 'image/png');

  await moduleLocator.click();
  console.log('✅ Clicked on Quote Request module');

  
  const postClickScreenshot = await this.page.screenshot();
  attachment('After Clicking Module', postClickScreenshot, 'image/png');
}


async mintproLogin(){

}


}