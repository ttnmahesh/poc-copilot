const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('./checkoutPage');

const url = 'https://rahulshettyacademy.com/client';
const username = 'johndoe@mailinator.com';
const password = 'Pass@123';

test.describe('Checkout Tests', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.login(username, password);
  });

  test('User logs in and searches for iPhone 13 Pro', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    const product = await page.$('text=iPhone 13 Pro');
    expect(product).not.toBeNull();
  });

  test('User adds iPhone 13 Pro to cart', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    const cartCount = await page.$eval('.cart-count', el => el.textContent);
    expect(cartCount).toBe('1');
  });

  test('User views cart details', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    await checkoutPage.proceedToCheckout();
    const cartItem = await page.$('text=iPhone 13 Pro');
    expect(cartItem).not.toBeNull();
  });

  test('User checks stock availability', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    const stockStatus = await page.$('text=In Stock');
    expect(stockStatus).not.toBeNull();
  });

  test('User proceeds to checkout', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    await checkoutPage.proceedToCheckout();
    const checkoutPageTitle = await page.title();
    expect(checkoutPageTitle).toContain('Checkout');
  });

  test('User enters invalid payment details', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.enterPaymentDetails('invalid details');
    const errorMessage = await page.$('text=Invalid payment details');
    expect(errorMessage).not.toBeNull();
  });

  test('User applies a valid discount coupon', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.applyDiscountCoupon('VALIDCOUPON');
    const discountApplied = await page.$('text=Discount applied');
    expect(discountApplied).not.toBeNull();
  });

  test('User places an order', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.addToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.placeOrder();
    const orderConfirmation = await page.$('text=Order confirmed');
    expect(orderConfirmation).not.toBeNull();
  });

  test('User views order history', async ({ page }) => {
    await checkoutPage.viewOrderHistory();
    const orderHistoryItem = await page.$('text=iPhone 13 Pro');
    expect(orderHistoryItem).not.toBeNull();
  });

  test('User checks order status', async ({ page }) => {
    await checkoutPage.viewOrderHistory();
    const orderStatus = await page.$('text=Order Status');
    expect(orderStatus).not.toBeNull();
  });
});// checkout.test.js
// Created this codebase by using prompt id: prompt_id_1

const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('./checkoutPage');
const { BASE_URL, USERNAME, PASSWORD } = require('./constants');

test.describe('Checkout Tests', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.login(USERNAME, PASSWORD);
  });

  test('Search Product: Search for iPhone 13 Pro and verify it appears in results', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    const product = await page.$('text=iPhone 13 Pro');
    expect(product).not.toBeNull();
  });

  test('Add to Cart: Add the product to the cart and verify the item count updates', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    const cartCount = await page.$eval('.cart-count', el => el.textContent);
    expect(cartCount).toBe('1');
  });

  test('Cart Verification: Check the product in the cart and verify stock availability', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    await checkoutPage.viewCart();
    const cartItem = await page.$('text=iPhone 13 Pro');
    expect(cartItem).not.toBeNull();
    const stockStatus = await page.$('text=In Stock');
    expect(stockStatus).not.toBeNull();
  });

  test('Checkout: Validate payment details and simulate a successful transaction', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    await checkoutPage.viewCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.enterPaymentDetails('valid details');
    await page.click('button:has-text("Continue")');
    const paymentSuccess = await page.$('text=Payment successful');
    expect(paymentSuccess).not.toBeNull();
  });

  test('Checkout: Apply valid discount coupon and verify outcome', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    await checkoutPage.viewCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.applyDiscountCoupon('VALIDCOUPON');
    const discountApplied = await page.$('text=Discount applied');
    expect(discountApplied).not.toBeNull();
  });

  test('Checkout: Apply invalid discount coupon and verify outcome', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    await checkoutPage.viewCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.applyDiscountCoupon('INVALIDCOUPON');
    const errorMessage = await page.$('text=Invalid coupon');
    expect(errorMessage).not.toBeNull();
  });

  test('Order Confirmation: Confirm the order and verify the success message', async ({ page }) => {
    await checkoutPage.searchProduct('iPhone 13 Pro');
    await checkoutPage.selectProduct();
    await checkoutPage.addToCart();
    await checkoutPage.viewCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.enterPaymentDetails('valid details');
    await checkoutPage.placeOrder();
    const orderConfirmation = await page.$('text=Order confirmed');
    expect(orderConfirmation).not.toBeNull();
  });

  test('Order Confirmation: Validate order details in "Your Orders"', async ({ page }) => {
    await checkoutPage.viewOrderHistory();
    const orderHistoryItem = await page.$('text=iPhone 13 Pro');
    expect(orderHistoryItem).not.toBeNull();
    const orderPrice = await page.$('text=$999');
    expect(orderPrice).not.toBeNull();
    const orderDate = await page.$('text=Order Date');
    expect(orderDate).not.toBeNull();
    const orderStatus = await page.$('text=Pending');
    expect(orderStatus).not.toBeNull();
  });

  test('Order Status: Check the status of the order and verify it is "Pending"', async ({ page }) => {
    await checkoutPage.viewOrderHistory();
    const orderStatus = await page.$('text=Pending');
    expect(orderStatus).not.toBeNull();
  });

  // add test case for empty username and password
  test('Login: Verify error message when username and password are empty', async ({ page }) => {
    await checkoutPage.login('', '');
    const errorMessage = await page.$('text=Invalid username or password');
    expect(errorMessage).not.toBeNull();
  });
});