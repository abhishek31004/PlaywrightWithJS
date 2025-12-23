const{test,expect}=require('@playwright/test');

test('UI controller' ,async ({page})=>
{
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const userName=  page.locator("#username");
       const signIn= page.locator("#signInBtn");
       const documentLink=page.locator("[href*='documents-request']");

       //dropdown
       const dropdown= page.locator("select.form-control"); 
       await dropdown.selectOption("Teacher");

       //await page.pause();

        //radio buttons

         await page.locator("span.checkmark").last().click();
         await page.locator("#okayBtn").click();// browers based pop-up
        //await page.pause();npx

        //asseration
        console.log(await page.locator("span.checkmark").last().isChecked());
        await expect(page.locator("span.checkmark").last()).toBeChecked();

        //checkbox
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();

     //   await page.pause();
     expect(await page.locator("#terms").isChecked()).toBeFalsy();
        
     //checking the attribute value
     await expect(documentLink).toHaveAttribute("class" ,"blinkingText");

}
);