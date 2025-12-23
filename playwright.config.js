// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { clear, trace } from 'console';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:30*1000,
  expect:{timeout:5000},
  reporter:'html',


  use:{
    browserName:'chromium',
   // browserName:'firefox',
    headless :true,
    screenshot: 'on',
    trace: 'on'
  }

});

 module.exports=config



