import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  retries: 0,
  // 👇 Add project with slowMo
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        baseURL: process.env.BASE_URL,
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        // ✅ slowMo goes here
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],
  reporter: [
    ['list'],
    ['html' , { outputFolder: 'playwright-report' }],
    ['allure-playwright'],
  ],
});
