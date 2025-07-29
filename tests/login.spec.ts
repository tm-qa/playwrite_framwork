import { test } from '@playwright/test';
import { NinjaPage } from '../pages/LoginPage';

test('Ninja login via Gmail', async ({ page }) => {
  const ninjaPage = new NinjaPage(page);

  await ninjaPage.loginToGmailAndNinja(
    process.env.NINJA_EMAIL || 'automationtesting@turtlemint.com',
    process.env.NINJA_PASSWORD || 'Turtle@2k25',
  
  );
  await ninjaPage.clickOnModule("Quote Request")
 
});
