// Import Playwright test runner utilities
const { test, expect } = require('@playwright/test');

// Import the LoginPage Page Object
const { LoginPage } = require('../pages/LoginPage');

// Group related login tests under a single test suite
test.describe('Login functionality', () => {

  // Positive test case: successful login with valid credentials
  test('Successful login with valid credentials', async ({ page }) => {
    // Create a new instance of the LoginPage for this test
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigate();

    // Perform login using valid credentials
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verify that a success message is displayed
    await loginPage.expectSuccessMessage();

    // Verify that the user is redirected to the secure area
    await expect(page).toHaveURL(/.*secure/);
  });

  // Negative test case: login attempt with an invalid username
  test('Login fails with invalid username', async ({ page }) => {
    // Create a new instance of the LoginPage for this test
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigate();

    // Attempt login with an invalid username and a valid password
    await loginPage.login('invalidUser', 'SuperSecretPassword!');

    // Verify that the appropriate error message is displayed
    await loginPage.expectErrorMessage('Your username is invalid!');

    // Verify that the user remains on the login page
    await expect(page).toHaveURL(/.*login/);
  });

  // Negative test case: login attempt with a valid username and invalid password
  test('Login fails with invalid password', async ({ page }) => {
    // Create a new instance of the LoginPage for this test
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigate();

    // Attempt login with a valid username and an invalid password
    await loginPage.login('tomsmith', 'WrongPassword');

    // Verify that the appropriate error message is displayed
    await loginPage.expectErrorMessage('Your password is invalid!');

    // Verify that the user remains on the login page
    await expect(page).toHaveURL(/.*login/);
  });

});
