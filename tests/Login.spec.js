const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login functionality', () => {

  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await loginPage.expectSuccessMessage();
    await expect(page).toHaveURL(/.*secure/);
  });

  test('Login fails with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('invalidUser', 'SuperSecretPassword!');

    await loginPage.expectErrorMessage('Your username is invalid!');
    await expect(page).toHaveURL(/.*login/);
  });

  test('Login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('tomsmith', 'WrongPassword');

    await loginPage.expectErrorMessage('Your password is invalid!');
    await expect(page).toHaveURL(/.*login/);
  });

});
