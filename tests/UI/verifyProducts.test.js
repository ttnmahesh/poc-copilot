const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/login");
const VerifyProducts = require("../../pages/verifyProducts");
const dashBoardUrl = "https://rahulshettyacademy.com/client/dashboard/dash";

test("Verify products after login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const verifyProducts = new VerifyProducts(page);

  await loginPage.navigate();
  await loginPage.login("john.doe9@example.com", "Password123");

  // Verify dashboard URL
  const currentUrl = await verifyProducts.verifyDashboardUrl();
  expect(currentUrl).toContain(dashBoardUrl);
  console.log("Dashboard URL:", currentUrl);

  // Fetch and print product details
  const productDetails = await verifyProducts.fetchProductDetails();
  productDetails.forEach((product) => {
    console.log(`Product Name: ${product.name}, Price: ${product.price}`);
  });

  // Check product buttons
  const buttonVisibility = await verifyProducts.checkProductButtons();
  buttonVisibility.forEach((visibility, index) => {
    expect(visibility.viewButtonVisible).toBe(true, `View button is not visible for product at index ${index}`);
    expect(visibility.addToCartButtonVisible).toBe(true, `Add To Cart button is not visible for product at index ${index}`);
  });

  await context.close();
});