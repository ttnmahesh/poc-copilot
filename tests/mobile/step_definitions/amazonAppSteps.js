const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const wd = require('wd');
const HomePage = require('../../../pages/mobile/HomePage');
const SearchResultsPage = require('../../../pages/mobile/SearchResultsPage');

setDefaultTimeout(60000); // Set default timeout to 60 seconds

let driver;
let homePage;
let searchResultsPage;

Given('I have launched the Amazon app', async function () {
  driver = wd.promiseChainRemote('http://localhost:4723/wd/hub');
  await driver.init({
    platformName: 'Android',
    deviceName: 'emulator-5554',
    app: '../app/amazon-shopping-28-16-0-100.apk',
    automationName: 'UiAutomator2'
  });
  homePage = new HomePage(driver);
  searchResultsPage = new SearchResultsPage(driver);
});

When('I search for {string}', async function (productName) {
  await homePage.searchProduct(productName);
});

Then('I should see the search results for {string}', async function (productName) {
  const firstResultText = await searchResultsPage.getFirstResultText();
  expect(firstResultText).toContain(productName);
  await driver.quit();
});

When('I add the first result to the cart', async function () {
  await searchResultsPage.addFirstResultToCart();
});

Then('I should see {string} in the cart', async function (productName) {
  const isProductInCart = await searchResultsPage.verifyProductInCart(productName);
  expect(isProductInCart).toBe(true);
  await driver.quit();
});