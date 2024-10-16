class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://rahulshettyacademy.com/client';
        this.registrationLinkSelector = 'text=Register Here';
        this.firstNameSelector = '#firstName';
        this.lastNameSelector = '#lastName';
        this.emailSelector = '#userEmail';
        this.phoneNumberSelector = '#userMobile';
        this.occupationSelector = 'select[formcontrolname="occupation"]';
        this.genderMaleSelector = 'input[value="Male"]';
        this.genderFemaleSelector = 'input[value="Female"]';
        this.passwordSelector = '#userPassword';
        this.confirmPasswordSelector = '#confirmPassword';
        this.checkboxSelector = 'input[type="checkbox"][formcontrolname="required"]';
        this.registerButtonSelector = '#login';
    }

    async navigate() {
        await this.page.goto(this.url);
        await this.page.click(this.registrationLinkSelector);
    }

    async enterFirstName(firstName) {
        await this.page.fill(this.firstNameSelector, firstName);
    }

    async enterLastName(lastName) {
        await this.page.fill(this.lastNameSelector, lastName);
    }

    async enterEmail(email) {
        await this.page.fill(this.emailSelector, email);
    }

    async enterPhoneNumber(phoneNumber) {
        await this.page.fill(this.phoneNumberSelector, phoneNumber);
    }

    async selectOccupation(occupation) {
        await this.page.selectOption(this.occupationSelector, occupation);
    }

    async selectGender(gender) {
        if (gender.toLowerCase() === 'male') {
            await this.page.check(this.genderMaleSelector);
        } else if (gender.toLowerCase() === 'female') {
            await this.page.check(this.genderFemaleSelector);
        }
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordSelector, password);
    }

    async enterConfirmPassword(confirmPassword) {
        await this.page.fill(this.confirmPasswordSelector, confirmPassword);
    }

    async checkAgreement() {
        await this.page.check(this.checkboxSelector);
    }

    async clickRegister() {
        await this.page.click(this.registerButtonSelector);
    }

    async register(firstName, lastName, email, phoneNumber, occupation, gender, password, confirmPassword) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPhoneNumber(phoneNumber);
        await this.selectOccupation(occupation);
        await this.selectGender(gender);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.checkAgreement();
        await this.clickRegister();
    }
}

module.exports = RegistrationPage;