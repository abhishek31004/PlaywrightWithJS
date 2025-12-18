// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { clear, trace } from 'console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use:
      {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        //...devices['iPhone 13 Pro Max']
      }
    },
      {
      name: 'Chrome',
      use:
      {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'retain-on-failure',
        //viewport: {width:1920,height:1080},
        //...devices['Pixel 5']
        ignoreHttpsErrors:true ,
        permissions:['geolocation']
      }
      }
        
    
  ]


});

module.exports = config



