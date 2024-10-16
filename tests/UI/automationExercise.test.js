const { test, expect } = require('@playwright/test');
const AutomationExercisePage = require('../../pages/automationExercise');

test.describe('Automation Exercise Tests', () => {
  let automationExercisePage;

  test.beforeEach(async ({ page }) => {
    automationExercisePage = new AutomationExercisePage(page);
    await automationExercisePage.login('test@999.com', 'Pass@123');
  });

  test('Verify Product Details and Capture Images', async ({ page }) => {
    const productDetails = await automationExercisePage.getProductDetails();

    // Assertions in the middle of the test
    expect(productDetails.length).toBeGreaterThan(0);

    for (const product of productDetails) {
      expect(product.title).not.toBe('Title not found');
      expect(product.price).not.toBe('Price not found');
      expect(product.description).not.toBe('Description not found');
      expect(product.imageUrl).not.toBe('');
    }

    // Final assertion
    expect(productDetails.length).toBeGreaterThan(0); // Ensure there are products on the page
  });

  test('Print Categories and Brands', async ({ page }) => {
    const categories = await automationExercisePage.getCategories();
    const brands = await automationExercisePage.getBrands();

    console.log('Categories:', categories);
    console.log('Brands:', brands);

    // Assertions
    expect(categories.length).toBeGreaterThan(0);
    expect(brands.length).toBeGreaterThan(0);
  });
});