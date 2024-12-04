const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login');
const AddProductInCart = require('../../pages/productCheckOut');

test('Add product to cart and checkout and verify', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const addProductInCart = new AddProductInCart(page);

    await loginPage.navigate();
    await loginPage.login("john.doe9@example.com", "Password123");

    // Add product to cart
    const productName = 'IPHONE 13 PRO';
    const { name, price } = await addProductInCart.addProductsToCart(productName);

    // Verify cart item count
    const isCartItemCountCorrect = await addProductInCart.verifyCartItemCount(1);
    expect(isCartItemCountCorrect).toBe(true);

    // Verify product in cart
    const cartVerification = await addProductInCart.verifyProductInCart(name, price);
    expect(cartVerification.productNameMatch).toBe(true);
    expect(cartVerification.productPriceMatch).toBe(true);
    expect(cartVerification.buyNowButtonVisible).toBe(true);
    expect(cartVerification.deleteButtonVisible).toBe(true);
    expect(cartVerification.continueShoppingButtonVisible).toBe(true);
    expect(cartVerification.checkoutButtonVisible).toBe(true);

     // Checkout process
     const successMessage = await addProductInCart.checkout('123', 'John Doe', 'India');
     expect(successMessage.trim()).toBe('Thankyou for the order.');
 
    await context.close();
});

// add negative test here to check if the user can checkout without filling the required fields
test('User cannot checkout without filling required fields', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const addProductInCart = new AddProductInCart(page);

    await loginPage.navigate();
    await loginPage.login("dgfd", "Password123");

    // add product to cart
    const productName = 'IPHONE 13 PRO';
    await addProductInCart.addProductToCart(productName);

    // Verify cart item count
    const isCartItemCountCorrect = await addProductInCart.verifyCartItemCount(1);
    expect(isCartItemCountCorrect).toBe(true);

    // Verify product in cart
    const cartVerification = await addProductInCart.verifyProductInCart('IPHONE 13 PRO', '1200');
    expect(cartVerification.productNameMatch).toBe(true);
    expect(cartVerification.productPriceMatch).toBe(true);
    expect(cartVerification.buyNowButtonVisible).toBe(true);
    expect(cartVerification.deleteButtonVisible).toBe(true);
    expect(cartVerification.continueShoppingButtonVisible).toBe(true);
    expect(cartVerification.checkoutButtonVisible).toBe(true);

    // Checkout process
    const successMessage = await addProductInCart.checkout('', '', '');
    expect(successMessage.trim()).toBe('Please fill the required fields');

    await context.close();

});
    


