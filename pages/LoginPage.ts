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
attachment('Login Page Screenshot', screenshot, 'image/png');
  console.log(' Email and password submitted');
await this.page.waitForTimeout(10000);


await popup.waitForSelector('//input[@aria-label="Employee ID"]', { timeout: 15000 });
await popup.locator('//input[@aria-label="Employee ID"]').fill('FBS4825');
console.log('Employee ID submitted');

await popup.locator('//span[text()="Next"]').click();
console.log('Clicked next after Employee ID');

// Wait for popup to close
await popup.waitForEvent('close', { timeout: 15000 });
console.log('Popup closed and focus returned to main page');

// Bring main page to front and wait for network idle
await this.page.bringToFront();
await this.page.waitForLoadState('networkidle');

// Optional wait for a welcome/header element that usually appears after login
try {
  await this.page.waitForSelector('//h2[contains(text(), "Welcome")]', { timeout: 20000 });
  console.log('Welcome text found on dashboard');
} catch (e) {
  console.warn('Welcome text not found. Continuing...');
}

// Confirm logo is visible
await expect(this.page.locator('//img[@src="images/logos/turtlemint_ninja-logo.svg"]')).toBeVisible({ timeout: 20000 });
console.log('Ninja dashboard loaded');

await this.page.pause()
// Take screenshot before final check
const finalScreenshot = await this.page.screenshot();
attachment('Ninja Dashboard Screenshot', finalScreenshot, 'image/png');

// Dump HTML in console for debugging (Jenkins logs)
console.log(await this.page.content());

// Final confirmation – wait robustly for QIS module
const qisLocator = this.page.locator('//a[@data-auto="qis-module"]');
await qisLocator.waitFor({ state: 'visible', timeout: 20000 });
await expect(qisLocator).toBeVisible();
console.log('Ninja dashboard view complete');

 
}


async clickOnModule(module: string) {

await expect(this.page.locator('//a[@data-auto="qis-module"]')).toBeVisible({
  timeout: 15000  
});

  const moduleLocator = this.page.locator('//a[@data-auto="qis-module"]');
  await moduleLocator.waitFor({ state: 'visible', timeout: 10000 });

  
  const preClickScreenshot = await this.page.screenshot();
  attachment('Before Clicking Module', preClickScreenshot, 'image/png');

  await moduleLocator.click();
  console.log(' Clicked on Quote Request module');

  
  const postClickScreenshot = await this.page.screenshot();
  attachment('After Clicking Module', postClickScreenshot, 'image/png');
}


async mintproLogin(){

}


}