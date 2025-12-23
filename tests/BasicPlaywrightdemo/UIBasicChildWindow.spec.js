const{test,expect}=require('@playwright/test');

test('child window handle' ,async ({browser})=>
{
      const context=await browser.newContext();
      const page= await context.newPage();
      const userName=  page.locator("#username");
       await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
       const documentLink=page.locator("[href*='documents-request']");

     const [newPage]= await Promise.all(
      [
      context.waitForEvent('page'),//listen  for any new page pending, rejected,fulfilled
      documentLink.click(),

      ])

      const text = await newPage.locator("p.red").textContent();
     console.log(text);

    const arrayText =text.split("@")
    const domain =arrayText[1].split(" ")[0]
    //console.log(domain);
    

   await page.locator("#username").fill(domain);

   //await page.pause();
   console.log(await page.locator("#username").textContent());
   console.log("****************");
   console.log(await page.locator("#username").inputValue());



}
);