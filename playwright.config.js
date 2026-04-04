// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['line'],
    ['html'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'http://localhost:5500',
    trace: 'on-first-retry',
    headless: true
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]

});
