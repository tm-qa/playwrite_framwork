import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const isCI = !!process.env.CI; 

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  retries: 0,
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        baseURL: process.env.BASE_URL,
        headless: isCI, 
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: isCI ? 0 : 500, // disable slowMo in CI
        },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        baseURL: process.env.BASE_URL,
        // headless: true,
      headless: isCI,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        launchOptions: {
          slowMo: isCI ? 0 : 500,
        },
      },
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright'],
  ],
});
