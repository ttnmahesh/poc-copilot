const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const LoginPage = require('../../../pages/login');
const AddProductInCart = require('../../../pages/productCheckOut');


let browser;
let page;
let context;
let loginPage;
let addProductInCart;

Given('I am on the login page', async function () {
  browser = await chromium.launch({ headless: false }); // Launch browser
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  addProductInCart = new AddProductInCart(page);
  await loginPage.navigate();
});

When('I log in with valid credentials', async function () {
  await loginPage.login('john.doe9@example.com', 'Password123');
});

When('I add the product {string} to the cart', async function (productName) {
  await addProductInCart.addProductToCart(productName);
});

When('I proceed to checkout', async function () {
  await addProductInCart.verifyCartItemCount(1);
  await addProductInCart.verifyProductInCart('IPHONE 13 PRO', '$999');
});

When('I fill in the checkout details', async function () {
  await addProductInCart.checkout('123', 'John Doe', 'India');
});

When('I fill in the checkout details with missing information', async function () {
  await addProductInCart.checkout('', '', '');
});

Then('I should see a success message', async function () {
  const successMessage = await page.locator('text=Thankyou for the order.').textContent();
  expect(successMessage.trim()).toBe('Thankyou for the order.');
  await browser.close();
});

Then('I should see an error message', async function () {
  const errorMessage = await page.locator('text=Please fill out this field.').textContent();
  expect(errorMessage.trim()).toBe('Please fill out this field.');
  await browser.close();
});