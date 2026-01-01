const {test, expect} = require('@playwright/test');
class CartPage
{
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async verifyProductIsDisplayed(productName)
{
    await this.page.waitForLoadState('domcontentloaded');
    
    // Get all product headings for debugging
    const allHeadings = await this.page.locator("h3").allTextContents();
    console.log("Products in cart:", allHeadings);
    
    const locator = this.getProductLocator(productName);
    try {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
        console.error(`Product "${productName}" not found in cart. Available products: ${allHeadings.join(', ')}`);
        throw error;
    }
    
    const bool = await locator.isVisible();
    expect(bool).toBeTruthy();
}

async checkOut()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3").filter({ hasText: productName.trim() });
}

}
module.exports = {CartPage};