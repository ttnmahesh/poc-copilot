const { test, expect } = require('@playwright/test');
const AutomationExercisePage = require('../../pages/automationExercise');

test.describe('Automation Exercise Tests', () => {
  let automationExercisePage;

  test.beforeEach(async ({ page }) => {
    automationExercisePage = new AutomationExercisePage(page);
    await automationExercisePage.login('test@999.com', 'Pass@123');
  });

  test('Verify Product Details and Capture Images', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds
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

  test.skip('Checkout Product - Cotton Mull Embroidered Dress', async ({ page }) => {
    const productName = 'Cotton Mull Embroidered Dress';
    await page.waitForSelector('.features_items'); // Ensure the page is fully loaded
    const product = await automationExercisePage.findProduct(productName);
    expect(product).not.toBeNull();

    await automationExercisePage.addProductToCart(product);
    await automationExercisePage.goToCart();
    await automationExercisePage.proceedToCheckout();

    const { deliveryAddress, billingAddress } = await automationExercisePage.verifyAddresses();

    // Assertions for addresses
    expect(deliveryAddress).toContain('John Doe');
    expect(billingAddress).toContain('John Doe');

    await automationExercisePage.enterPaymentDetails('John Doe', '4111111111111111', '123', '12', '2025');
    await automationExercisePage.placeOrder();

    const confirmationMessage = await automationExercisePage.verifyOrderConfirmation();

    // Final assertion
    expect(confirmationMessage).toContain('Order Placed!');
    expect(confirmationMessage).toContain('Congratulations! Your order has been confirmed!');
  });
});