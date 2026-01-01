import{test,expect,Locator,Page} from '@playwright/test';

export class DashboardPage
{

     products:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    page:Page;

constructor(page:Page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName:string)
{
    // Wait for products to load before searching
    await this.productsText.first().waitFor({ state: 'visible', timeout: 5000 });
    
    const titles = await this.productsText.allTextContents();
    console.log("Available products:", titles);

    const allProducts = await this.products.all();
    for (const product of allProducts) {
        const text = await product.locator("b").textContent();
        // Normalize comparison: trim both sides and compare as-is
        if (text?.trim() === productName.trim()) {
            console.log(`Found product: ${productName}, clicking Add To Cart`);
            // Use more reliable button locator
            const addBtn = product.locator("button").filter({ hasText: /Add To Cart/ });
            await addBtn.click();
            
            // Wait for cart to update
            await this.page.waitForLoadState('domcontentloaded');
            console.log(`Product ${productName} added to cart`);
            break;
        }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}
module.exports = {DashboardPage};