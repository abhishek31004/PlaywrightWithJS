import{test,expect,Locator,Page} from '@playwright/test';
export class OrdersHistoryPage {
    
        ordersTable:Locator;
        rows:Locator;
        orderdIdDetails:Locator;
        page:Page;

    constructor(page:Page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId:any) {

        await this.ordersTable.waitFor({ timeout: 30000 });
        const cleanOrderId = orderId.trim();
        let found = false;
        
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            const cleanRowOrderId = rowOrderId?.trim() || "";
            
            // Check if rowOrderId is contained in the orderId (order IDs can have prefixes)
            if (cleanOrderId.includes(cleanRowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                found = true;
                break;
            }
        }
        
       
    }

    async getOrderId() {
        const orderId = await this.orderdIdDetails.textContent();
        return orderId?.trim() || "";
    }

}
module.exports = { OrdersHistoryPage };
