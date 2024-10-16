const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../../pages/registration');

test('User can register successfully', async ({ browser }) => {
    // Launch browser with specific viewport size
    const context = await browser.newContext({
        viewport: { width: 1900, height: 1080 }
    });
    const page = await context.newPage();

    const registrationPage = new RegistrationPage(page);

     // Generate a unique email address
     const uniqueEmail = `john.doe${Date.now()}@example.com`;

    await registrationPage.navigate();
    await registrationPage.register(
        'John', 
        'Doe', 
        uniqueEmail, 
        '1234567890', 
        'Engineer', 
        'Male', 
        'Password123', 
        'Password123'
    );

    // Check if the success message is displayed
    const successMessage = await page.locator('text=Account Created Successfully');
    await expect(successMessage).toBeVisible();

    // Check if the login button is displayed
    const loginButton = await page.locator('text=Login');
    await expect(loginButton).toBeVisible();

    await context.close();
});

test('User cannot register with mismatched passwords', async ({ browser }) => {
    // Launch browser with specific viewport size
    const context = await browser.newContext({
        viewport: { width: 1900, height: 1080 }
    });
    const page = await context.newPage();

    const registrationPage = new RegistrationPage(page);

    await registrationPage.navigate();
    await registrationPage.register(
        'Jane', 
        'Doe', 
        'jane.doe@example.com', 
        '0987654321', 
        'Doctor', 
        'Female', 
        'Password123', 
        'Password456' // Mismatched passwords
    );

    // Check if the error message is displayed
    const errorMessage = await page.locator('text=Password and Confirm Password must match with each other.');
    await expect(errorMessage).toBeVisible();

    await context.close();
});

