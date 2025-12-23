//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
import { customTest } from './utils_ts/test-base';
import { POManager } from '../pageObject_ts/POManager';
//json->string-js object
const dataset = JSON.parse(JSON.stringify(require('../tests/utils/placeOrderTestData.json')));

for(const data of dataset)
{
test(`@Web Client App login for ${data.productName}`, async ({ page }) => 
   {
   const pOManager = new POManager(page);
   const loginPage = pOManager.getLoginPage();
   await loginPage.landOnLogin();
   //await loginPage.validLogin(dataset.username, dataset.password);
   await loginPage.validLogin(data.username, data.password);

   const dashboardPage = pOManager.getDashboardPage();
   //await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.searchProductAddCart(data.productName);
   await dashboardPage.navigateToCart();
   const cartPage = pOManager.getCartPage();
   //await cartPage.VerifyProductIsDisplayed(dataset.productName);
   await cartPage.VerifyProductIsDisplayed(data.productName);
   await cartPage.Checkout();

   const ordersReviewPage = pOManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind", "India");
   let orderId:any;
   orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = pOManager.getorderHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}


customTest(`Client App Login`,async({page,testDataForOrder})=>
{
  const pOManager = new POManager(page);
   const loginPage = pOManager.getLoginPage();
   await loginPage.landOnLogin();
   //await loginPage.validLogin(dataset.username, dataset.password);
   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

   const dashboardPage = pOManager.getDashboardPage();
   //await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.navigateToCart();
   const cartPage = pOManager.getCartPage();
   //await cartPage.VerifyProductIsDisplayed(dataset.productName);
   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cartPage.Checkout();

}

)
