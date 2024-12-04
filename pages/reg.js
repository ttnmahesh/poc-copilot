class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.addressInput = page.locator('textarea[ng-model="Adress"]');
    this.emailInput = page.locator('input[ng-model="EmailAdress"]');
    this.phoneInput = page.locator('input[ng-model="Phone"]');
    this.genderRadio = page.locator('input[value="Male"]');
    this.hobbiesCheckbox = page.locator('input[value="Cricket"]');
    this.skillsDropdown = page.locator('#Skills');
    this.countryDropdown = page.locator('#countries');
    this.selectCountryDropdown = page.locator('span[role="combobox"]');
    this.selectCountryInput = page.locator('input[role="textbox"]');
    this.yearDropdown = page.locator('#yearbox');
    this.monthDropdown = page.locator('select[ng-model="monthbox"]');
    this.dayDropdown = page.locator('#daybox');
    this.passwordInput = page.locator('#firstpassword');
    this.confirmPasswordInput = page.locator('#secondpassword');
    this.submitButton = page.locator('#submitbtn');
    this.successMessage = page.locator('text=Thank you for registration');
    this.errorMessage = page.locator('text=Please fill out this field');
  }

  async navigate() {
    await this.page.goto('https://demo.automationtesting.in/Register.html');
  }

  async fillForm(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.genderRadio.check();
    await this.hobbiesCheckbox.check();
    await this.skillsDropdown.selectOption(data.skills);
    await this.countryDropdown.selectOption(data.country);
    await this.selectCountryDropdown.click();
    await this.selectCountryInput.fill(data.selectCountry);
    await this.selectCountryInput.press('Enter');
    await this.yearDropdown.selectOption(data.year);
    await this.monthDropdown.selectOption(data.month);
    await this.dayDropdown.selectOption(data.day);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage;
  }

  async getErrorMessage() {
    return this.errorMessage;
  }
}

module.exports = RegistrationPage;