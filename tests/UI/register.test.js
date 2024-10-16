const { test, expect } = require('@playwright/test');
const RegisterPage = require('../../pages/register');

test.describe('Registration Tests', () => {
    test('Positive Test: Successful Registration', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.navigate();
        await registerPage.clickRegisterLink();

        const registrationData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890',
            occupation: 'Engineer',
            gender: 'Male',
            password: 'Password123',
            confirmPassword: 'Password123'
        };

        await registerPage.fillRegistrationForm(registrationData);
        await registerPage.submitRegistrationForm();

        // Add assertions to verify successful registration
        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard');
        await context.close();
    });

    test('Negative Test: Registration with Missing Fields', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.navigate();
        await registerPage.clickRegisterLink();

        const registrationData = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            occupation: '',
            gender: '',
            password: '',
            confirmPassword: ''
        };

        await registerPage.fillRegistrationForm(registrationData);
        await registerPage.submitRegistrationForm();

        // Add assertions to verify error messages
        await expect(page.locator('text=Please fill out this field.')).toBeVisible();
        await context.close();
    });

    test('Negative Test: Registration with Mismatched Passwords', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.navigate();
        await registerPage.clickRegisterLink();

        const registrationData = {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            phoneNumber: '0987654321',
            occupation: 'Doctor',
            gender: 'Female',
            password: 'Password123',
            confirmPassword: 'Password456'
        };

        await registerPage.fillRegistrationForm(registrationData);
        await registerPage.submitRegistrationForm();

        // Add assertions to verify error messages
        await expect(page.locator('text=Passwords do not match')).toBeVisible();
        await context.close();
    });
});