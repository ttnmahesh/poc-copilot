const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/login");

test("User can login successfully", async ({ browser }) => {
  // Launch browser with specific viewport size
  const context = await browser.newContext({
    viewport: { width: 1900, height: 1080 },
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login("john.doe9@example.com", "Password123");

  // Assert the URL
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/dashboard/dash"
  );

  // Assert the presence of the "Sign Out" button
  const signOutButton = await page.locator('button:has-text("Sign Out")');
  await expect(signOutButton).toBeVisible();

  await context.close();
});

test("User cannot login with invalid credentials", async ({ browser }) => {
  // Launch browser with specific viewport size
  const context = await browser.newContext({
    viewport: { width: 1900, height: 1080 },
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login("invalid.email@example.com", "invalidPassword123");

  // Check if the error toast message is displayed
  const errorMessage = await page.locator(
    'div[aria-label="Incorrect email or password."]'
  );
  await errorMessage.waitFor({ state: "visible" });
  await expect(errorMessage).toBeVisible();

  await context.close();
});

// write few more negative tests

test("User cannot login with invalid email", async ({ browser }) => {
  // Launch browser with specific viewport size
  const context = await browser.newContext({
    viewport: { width: 1900, height: 1080 },
  });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login("", "Password123");

  // Check if the error toast message is displayed
  const errorMessage = await page.locator(
    "text=*Email is required"
  );
  await errorMessage.waitFor({ state: "visible" });
  await expect(errorMessage).toBeVisible();

  await context.close();
});
