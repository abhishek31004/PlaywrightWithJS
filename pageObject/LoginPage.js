class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']")
        this.userName = page.locator("#userEmail")
        this.password = page.locator("#userPassword");
    }


    async landOnLogin() {

        await this.page.goto("https://rahulshettyacademy.com/client", { waitUntil: 'load', timeout: 60000 });
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('load');
    }

}
module.exports = { LoginPage };