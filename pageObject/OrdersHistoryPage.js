class OrdersHistoryPage 

{
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId) {

        await this.ordersTable.waitFor({ timeout: 30000 });
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async getOrderId() {
        return await this.orderdIdDetails.textContent();
    }

}
module.exports = { OrdersHistoryPage };
