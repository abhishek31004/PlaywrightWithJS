const {test, expect} = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    // Locators for elements on the cart page
    this.cartProducts = page.locator("div li").first(); // First product in the cart
    this.productsText = page.locator(".card-body b"); // Product name text
    this.cart = page.locator("[routerlink*='cart']"); // Cart link
    this.orders = page.locator("button[routerlink*='myorders']"); // Orders button
    this.checkout = page.locator("text=Checkout"); // Checkout button
  }

  /**
   * Verify if a specific product is displayed in the cart.
   * @param {string} productName - The name of the product to verify.
   */
  async verifyProductIsDisplayed(productName) {
    await this.cartProducts.waitFor(); // Wait for the cart products to load
    const bool = await this.getProductLocator(productName).isVisible(); // Check if the product is visible
    expect(bool).toBeTruthy(); // Assert that the product is displayed
  }

  /**
   * Click the checkout button to proceed.
   */
  async checkOut() {
    await this.checkout.click(); // Click the checkout button
  }

  /**
   * Get the locator for a specific product based on its name.
   * @param {string} productName - The name of the product.
   * @returns {Locator} - The locator for the product.
   */
  getProductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')"); // Locator for the product by name
  }
}

module.exports = { CartPage };