class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerLink = 'text=Register here';
        this.firstNameInput = 'input[name="firstName"]';
        this.lastNameInput = 'input[name="lastName"]';
        this.emailInput = 'input[name="email"]';
        this.phoneNumberInput = 'input[name="phone"]';
        this.occupationSelect = 'select[name="occupation"]';
        this.genderSelect = 'select[name="gender"]';
        this.passwordInput = 'input[name="password"]';
        this.confirmPasswordInput = 'input[name="confirmPassword"]';
        this.termsCheckbox = 'input[type="checkbox"]';
        this.registerButton = 'button[type="submit"]';
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async clickRegisterLink() {
        await this.page.click(this.registerLink);
    }

    async fillRegistrationForm(data) {
        await this.page.fill(this.firstNameInput, data.firstName);
        await this.page.fill(this.lastNameInput, data.lastName);
        await this.page.fill(this.emailInput, data.email);
        await this.page.fill(this.phoneNumberInput, data.phoneNumber);
        await this.page.selectOption(this.occupationSelect, data.occupation);
        await this.page.selectOption(this.genderSelect, data.gender);
        await this.page.fill(this.passwordInput, data.password);
        await this.page.fill(this.confirmPasswordInput, data.confirmPassword);
        await this.page.check(this.termsCheckbox);
    }

    async submitRegistrationForm() {
        await this.page.click(this.registerButton);
    }
}

module.exports = RegisterPage;