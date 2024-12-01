class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://rahulshettyacademy.com/client';
        this.emailSelector = 'input[placeholder="email@example.com"]';
        this.passwordSelector = '#userPassword';
        this.loginButtonSelector = '#login';
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async enterEmail(email) {
        await this.page.fill(this.emailSelector, email);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordSelector, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButtonSelector);
    }

    // async login(email, password) {
    //     await this.enterEmail(email);
    //     await this.enterPassword(password);
    //     await this.clickLogin();
    // }

    async login1(email, password) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

module.exports = LoginPage;