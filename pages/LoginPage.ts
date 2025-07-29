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

  
  console.log('Clicking on Google Sign-In...');
  const [popup] = await Promise.all([
    this.page.waitForEvent('popup'),
    this.page.locator('//span/a[@id="google-signin-button"]').click(),
  ]);

  await popup.waitForLoadState('load');
  console.log('Google login popup opened');

  
  await popup.locator('#identifierId').fill(email);
  await popup.locator('#identifierNext').click();

  
  await popup.waitForSelector('input[name="Passwd"]', { timeout: 10000 });
  await popup.locator('input[name="Passwd"]').fill(password);
  await popup.locator('#passwordNext').click();

  console.log('Email and password submitted');

  
  await this.page.waitForLoadState('networkidle', { timeout: 20000 });

  
  const loggedInElement = this.page.locator('a[data-auto="qis-module"]');
  await expect(loggedInElement).toBeVisible({ timeout: 15000 });
  console.log('Login successful, Quote Request module visible');
}

}