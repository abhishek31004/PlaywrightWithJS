const {test,expect}=require('@playwright/test')

//test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'parallel'});
test(`popup validation`,async({page})=>

    {
       await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //    await page.goto("https://www.google.com/");
    //    await page.goBack();
    //    await page.goForward();


    //TO CHECK VISIBLEITY O
         await expect(page.locator('#displayed-text')).toBeVisible();
         await page.locator("#hide-textbox").click();
         await expect (page.locator("#displayed-text")).toBeHidden();


         //TO handle the pop up(dialog )
        await page.pause();
        page.on('dialog',dialog =>dialog.accept());
        await page.locator("#confirmbtn").click();

        //how to handle hover
        await page.locator("#mousehover").hover();

        //await page.locator("").click();

        // to work with frame

        const framesPage=page.frameLocator("iframe-name");
        await framesPage.locator("div[class='min-h-screen'] nav a[href*='all-access']").click();



    }
)


test(`@Web Capture a screenshot and visual comparison`,async({page})=>
{   
    await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //TO CHECK VISIBLEITY O
         await expect(page.locator('#displayed-text')).toBeVisible();
         await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
         await page.locator("#hide-textbox").click();
         await page.screenshot({path:'screenshot.png'});
         await expect (page.locator("#displayed-text")).toBeHidden();
}
)

test('visual test',async({page})=>
{
   // await page.goto("https://www.flightaware.com/");

   await page.goto("https://www.irctc.co.in/nget/train-search");
    expect (await page.screenshot()).toMatchSnapshot('landing.png');
})