const { expect } = require("@playwright/test");

class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    }

    async searchCountryAndSelect(countryCode, countryName) {
        // Clear any existing input first
        await this.country.clear();
        // Type the country code
        await this.country.type(countryCode, { delay: 100 });
        
        // Wait for the dropdown to become visible
        await this.dropdown.waitFor({ state: 'visible', timeout: 5000 });
        
        // Add a small delay to ensure dropdown options are rendered
        await this.page.waitForTimeout(500);
        
        // Get all option buttons
        const options = this.dropdown.locator("button");
        const optionsCount = await options.count();
        
        console.log(`Found ${optionsCount} options in dropdown for country: ${countryName}`);
        
        // Search for the matching country
        let found = false;
        for (let i = 0; i < optionsCount; ++i) {
            const text = await options.nth(i).textContent();
            //console.log(`Option ${i}: "${text.trim()}"`);
            if (text.trim() === countryName) {
                console.log(`Found matching country: ${countryName}`);
                await options.nth(i).click();
                found = true;
                break;
            }
        }

    }

    async verifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }
    

    async submitAndGetOrderId() {
        // Wait until the submit button is clickable and click it
        await this.submit.waitFor({ state: 'visible' });
        await this.submit.click();

        // Wait for the order confirmation text to appear (faster than networkidle)
        await this.orderConfirmationText.waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.orderConfirmationText).toHaveText("Thankyou for the order.");
        
        // Wait for the order ID to be visible before extracting it
        await this.orderId.waitFor({ state: 'visible', timeout: 5000 });
        return await this.orderId.textContent();
    }

}
module.exports = { OrdersReviewPage };