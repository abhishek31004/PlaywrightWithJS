const { test, expect } = require('@playwright/test');


test('First test case', async ({ browser }) => {
   //playwright code
   //step 1-open browser
   //step2 -->enter Username/password
   //step3 -->click
   //asynch step in javascript


   const context = await browser.newContext();
   const page = await context.newPage();

   const Username = page.locator("#username");
   const SignIn = page.locator("[value='Sign In']");


 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");   // navigate to the login page
     console.log(await page.title());
   //expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   await Username.fill(" rahulshetty");
   await page.locator("[type='password']").fill("learning");
   
   await SignIn.click(); // click the Sign In button
   console.log(await page.locator("[style*=block]").textContent());
   await expect(page.locator("[style*=block]")).toContainText('Incorrect')

  // await Username.fill("");
   await Username.fill("rahulshettyacademy");
   await SignIn.click();
   // console.log(await page.locator(".card-body a").textContent());
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").nth(1).textContent());

}

);

test('page playwright test ', async ({ page }) => {
   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
   console.log(await page.title());
   await expect(page).toHaveTitle("OrangeHRM");
}
);