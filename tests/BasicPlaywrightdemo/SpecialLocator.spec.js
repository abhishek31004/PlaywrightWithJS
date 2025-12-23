import {test,expect} from '@playwright/test';

test('Playwright Special locators',async ({page})=>
 {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();
  
    await page.getByPlaceholder("Password").fill("abhi@123");
    await page.getByRole("button",{name:'Submit'}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.pause();
    
}

);