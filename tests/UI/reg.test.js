const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../../pages/reg');

const validData = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  email: 'johndoe@example.com',
  phone: '1234567890',
  skills: 'Java',
  country: 'India',
  selectCountry: 'India',
  year: '1990',
  month: 'January',
  day: '1',
  password: 'password123',
  confirmPassword: 'password123'
};

const invalidData = {
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  phone: '',
  skills: '',
  country: '',
  selectCountry: '',
  year: '',
  month: '',
  day: '',
  password: '',
  confirmPassword: ''
};

test.describe('Registration Tests', () => {
 
    test('User can register with valid data', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1900, height: 1080 },
    });
    const page = await context.newPage();
    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();
    await registrationPage.fillForm(validData);
    await registrationPage.submitForm();

    const successMessage = await registrationPage.getSuccessMessage();
    await successMessage.waitFor({ state: 'visible' });
    await expect(successMessage).toBeVisible();

    await context.close();
  });

  test('User cannot register with missing required fields', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1900, height: 1080 },
    });
    const page = await context.newPage();
    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();
    await registrationPage.fillForm(invalidData);
    await registrationPage.submitForm();

    const errorMessage = await registrationPage.getErrorMessage();
    await errorMessage.waitFor({ state: 'visible' });
    await expect(errorMessage).toBeVisible();

    await context.close();
  });

  // Add more negative test cases as needed
});