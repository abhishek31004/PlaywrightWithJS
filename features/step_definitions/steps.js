const { When, Then, Given, setDefaultTimeout, After } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObject/POManager');
const { chromium, expect } = require('@playwright/test');

setDefaultTimeout(60000);

Given('the user is on the login Ecommerce Application with valid {string} and {string}', async function (username, password) 
{
    const loginPage = this.pOManager.getLoginPage();
    await loginPage.landOnLogin();
    await loginPage.validLogin(username, password);
});



When('Add {string} to the cart', async function (productName) 
{       
    this.dashboardPage = this.pOManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});



Then('verify {string} is displayed in the cart', { timeout: 60 * 1000 }, async function (productName) 
{    
    const cartPage = this.pOManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();
});



When('enter valid details and place the order', { timeout: 60 * 1000 }, async function () 
{
    const ordersReviewPage = this.pOManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(this.orderId);
});


Then('verify order is present in the orderhistory', { timeout: 60 * 1000 }, async function () 
{
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.pOManager.getorderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

After(async function () {
    await this.context.close();
    await this.browser.close();
});

