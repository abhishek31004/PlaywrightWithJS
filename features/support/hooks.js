const { When, Then, Given, setDefaultTimeout, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObject/POManager');
const { chromium, expect } = require('@playwright/test');
const { After } = require('@cucumber/cucumber');




Before(async function () {
  this.browser = await chromium.launch({
         headless: false,
     });
     this.context = await this.browser.newContext();
     this.page = await this.context.newPage();
     this.pOManager = new POManager(this.page);
});




After(function () {
    console.log("I am in the last excute");
});

BeforeStep(function ({}) {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function (scenario) {
  // This hook will be executed after all steps in a scenario with tag @foo
    if (scenario.result.status === 'FAILED') {
        await this.page.screenshot({ path: `screenshot-${Date.now()}.png` });
    }
});