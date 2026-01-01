const { test, expect } = require('@playwright/test');
const{customtest}=require('../tests/utils/test-base');
const { POManager } = require('../pageObject/POManager');
const { beforeEach } = require('node:test');

// Parse test data from JSON file
const dataset = JSON.parse(JSON.stringify(require('../tests/utils/placeOrderTestData.json')));
let pOManager;

// Initialize Page Object Manager before each test
test.beforeEach(async ({ page }) => {
  pOManager = new POManager(page);
});

// Loop through dataset to run tests for each product
for(const data of dataset) {
  test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
    // Login to the application
    const loginPage = pOManager.getLoginPage();
    await loginPage.landOnLogin();
    await loginPage.validLogin(data.username, data.password);

    // Search for the product and add it to the cart
    const dashboardPage = pOManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);

    // Navigate to the cart and verify the product
    await dashboardPage.navigateToCart();
    const cartPage = pOManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkOut();

    // Review the order and submit
    const ordersReviewPage = pOManager.getOrdersReviewPage();
   // await page.pause(); // Pause for debugging purposes
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.submitAndGetOrderId();
    console.log(orderId);

    // Navigate to orders history and verify the order
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = pOManager.getorderHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}

// Custom test for client app login
customtest(`Client App Login`, async ({ page, testDataForOrder }) => {
  // Login to the application
  const loginPage = pOManager.getLoginPage();
  await loginPage.landOnLogin();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  // Search for the product and add it to the cart
  const dashboardPage = pOManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);

  // Navigate to the cart and verify the product
  await dashboardPage.navigateToCart();
  const cartPage = pOManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.checkOut();
});
