// Import the expect assertion utility from Playwright
const { expect } = require('@playwright/test');

// Page Object that represents the Login page
class LoginPage {

  // The constructor receives the Playwright 'page' instance
  constructor(page) {
    // Store the page reference for later use
    this.page = page;

    // Selectors for the login page elements
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.flashMessage = '#flash';
  }

  // Navigates to the login page
  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  // Performs the login action using the provided credentials
  async login(username, password) {
    // Fill in the username field
    await this.page.fill(this.usernameInput, username);

    // Fill in the password field
    await this.page.fill(this.passwordInput, password);

    // Click the login button
    await this.page.click(this.loginButton);
  }

  // Verifies that an error message is displayed
  async expectErrorMessage(text) {
    // Assert that the flash message contains the expected error text
    await expect(this.page.locator(this.flashMessage))
      .toContainText(text);
  }

  // Verifies that the login was successful
  async expectSuccessMessage() {
    // Assert that the success message is displayed after a valid login
    await expect(this.page.locator(this.flashMessage))
      .toContainText('You logged into your acount!');
  }
}

// Export the LoginPage class so it can be used in test files
module.exports = { LoginPage };
