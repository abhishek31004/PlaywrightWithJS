const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');

const loginPayload = {
    userEmail: "abiqa@gmail.com",
    userPassword: "Qwerty@123",
};

const orderPayLoad = {
    orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};

const fakePayLoadOrders = { data: [], message: "No Orders" }

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayLoad);
});

// create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },
        response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    page.route("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*"
        , async route => {
            //intercepting response-Api response->{playwirght fakeresponse}->browser
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                });

        });


    await page.locator("button[routerlink*='myorders']").click();
    await page.pause();

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*")
 
  console.log(await page.locator(".mt-4").textContent());


    

}); 